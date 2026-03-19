import os
import ssl
import random
import certifi
from datetime import datetime, timedelta
from typing import Optional

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from pydantic import BaseModel
from jose import jwt
from passlib.context import CryptContext
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Work A Day API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = MongoClient(
    os.getenv("MONGODB_URL"),
    tls=True,
    tlsCAFile=certifi.where(),
    tlsAllowInvalidCertificates=False,
    serverSelectionTimeoutMS=30000
)
db = client[os.getenv("DATABASE_NAME")]

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# ─── Models ───────────────────────────────────────────────────────────────────

class SendOTPRequest(BaseModel):
    phone: str

class VerifyOTPRequest(BaseModel):
    phone: str
    otp: str

class WorkerProfile(BaseModel):
    name: str
    skill: str
    experience: int
    wage: int
    city: str
    area: str

class ContractorProfile(BaseModel):
    name: str
    company: str
    city: str
    area: str

class JobPost(BaseModel):
    title: str
    skill: str
    workers_needed: int
    wage: int
    city: str
    area: str
    start_date: str
    start_time: str
    description: str

class ApplyJob(BaseModel):
    job_id: str
    worker_id: str

class UpdateApplication(BaseModel):
    application_id: str
    status: str

# ─── Helpers ──────────────────────────────────────────────────────────────────

def create_token(data: dict):
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    data.update({"exp": expire})
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)

def generate_otp():
    return str(random.randint(100000, 999999))

# ─── Auth Routes ──────────────────────────────────────────────────────────────

@app.post("/auth/send-otp")
async def send_otp(req: SendOTPRequest):
    try:
        otp = generate_otp()
        db.otps.update_one(
            {"phone": req.phone},
            {"$set": {"otp": otp, "created_at": datetime.utcnow()}},
            upsert=True
        )
        print(f"OTP for {req.phone}: {otp}")
        return {"message": "OTP sent", "otp": otp}
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/auth/verify-otp")
async def verify_otp(req: VerifyOTPRequest):
    try:
        record = db.otps.find_one({"phone": req.phone})
        if not record or record["otp"] != req.otp:
            raise HTTPException(status_code=400, detail="Invalid OTP")

        user = db.users.find_one({"phone": req.phone})
        if not user:
            db.users.insert_one({
                "phone": req.phone,
                "role": "none",
                "profile_complete": False,
                "created_at": datetime.utcnow()
            })
            user = db.users.find_one({"phone": req.phone})

        is_admin = req.phone == "9999999999"
        if is_admin:
            db.users.update_one({"phone": req.phone}, {"$set": {"role": "admin"}})

        token = create_token({"phone": req.phone})
        return {
            "token": token,
            "user": {
                "id": str(user["_id"]),
                "phone": user["phone"],
                "role": "admin" if is_admin else user.get("role", "none"),
                "profile_complete": user.get("profile_complete", False),
                "name": user.get("name", "")
            }
        }
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# ─── Worker Routes ────────────────────────────────────────────────────────────

@app.post("/worker/setup")
async def setup_worker(phone: str, profile: WorkerProfile):
    try:
        db.users.update_one(
            {"phone": phone},
            {"$set": {
                "name": profile.name,
                "role": "worker",
                "skill": profile.skill,
                "experience": profile.experience,
                "wage": profile.wage,
                "city": profile.city,
                "area": profile.area,
                "profile_complete": True,
                "rating": 0,
                "completed_jobs": 0,
            }}
        )
        return {"message": "Worker profile saved"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/workers")
async def get_workers(city: Optional[str] = None, skill: Optional[str] = None):
    try:
        query = {"role": "worker"}
        if city:
            query["city"] = city
        if skill:
            query["skill"] = skill
        workers = list(db.users.find(query, {"_id": 1, "name": 1, "skill": 1, "experience": 1, "wage": 1, "city": 1, "area": 1, "rating": 1, "completed_jobs": 1}))
        for w in workers:
            w["id"] = str(w.pop("_id"))
        return workers
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ─── Contractor Routes ────────────────────────────────────────────────────────

@app.post("/contractor/setup")
async def setup_contractor(phone: str, profile: ContractorProfile):
    try:
        db.users.update_one(
            {"phone": phone},
            {"$set": {
                "name": profile.name,
                "role": "contractor",
                "company": profile.company,
                "city": profile.city,
                "area": profile.area,
                "profile_complete": True,
                "rating": 0,
                "completed_jobs": 0,
            }}
        )
        return {"message": "Contractor profile saved"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ─── Job Routes ───────────────────────────────────────────────────────────────

@app.post("/jobs")
async def post_job(phone: str, job: JobPost):
    try:
        contractor = db.users.find_one({"phone": phone})
        if not contractor:
            raise HTTPException(status_code=404, detail="Contractor not found")
        new_job = {
            "title": job.title,
            "skill": job.skill,
            "workers_needed": job.workers_needed,
            "wage": job.wage,
            "city": job.city,
            "area": job.area,
            "start_date": job.start_date,
            "start_time": job.start_time,
            "description": job.description,
            "contractor_id": str(contractor["_id"]),
            "contractor_name": contractor.get("name", ""),
            "status": "active",
            "created_at": datetime.utcnow()
        }
        result = db.jobs.insert_one(new_job)
        return {"message": "Job posted", "job_id": str(result.inserted_id)}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/jobs")
async def get_jobs(city: Optional[str] = None, skill: Optional[str] = None, min_wage: Optional[int] = None):
    try:
        query = {"status": "active"}
        if city:
            query["city"] = city
        if skill:
            query["skill"] = skill
        if min_wage:
            query["wage"] = {"$gte": min_wage}
        jobs = list(db.jobs.find(query))
        for j in jobs:
            j["id"] = str(j.pop("_id"))
            j.pop("contractor_id", None)
        return jobs
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ─── Application Routes ───────────────────────────────────────────────────────

@app.post("/jobs/apply")
async def apply_job(application: ApplyJob):
    try:
        existing = db.applications.find_one({
            "job_id": application.job_id,
            "worker_id": application.worker_id
        })
        if existing:
            raise HTTPException(status_code=400, detail="Already applied")
        db.applications.insert_one({
            "job_id": application.job_id,
            "worker_id": application.worker_id,
            "status": "pending",
            "applied_at": datetime.utcnow()
        })
        return {"message": "Applied successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/jobs/{job_id}/applicants")
async def get_applicants(job_id: str):
    try:
        from bson import ObjectId
        applications = list(db.applications.find({"job_id": job_id}))
        result = []
        for application in applications:
            worker = db.users.find_one({"_id": ObjectId(application["worker_id"])})
            if worker:
                result.append({
                    "application_id": str(application["_id"]),
                    "worker_id": application["worker_id"],
                    "status": application["status"],
                    "name": worker.get("name", ""),
                    "skill": worker.get("skill", ""),
                    "experience": worker.get("experience", 0),
                    "wage": worker.get("wage", 0),
                    "rating": worker.get("rating", 0),
                    "completed_jobs": worker.get("completed_jobs", 0),
                    "city": worker.get("city", ""),
                    "area": worker.get("area", ""),
                })
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.put("/applications/update")
async def update_application(update: UpdateApplication):
    try:
        from bson import ObjectId
        db.applications.update_one(
            {"_id": ObjectId(update.application_id)},
            {"$set": {"status": update.status}}
        )
        return {"message": "Application updated"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ─── Admin Routes ─────────────────────────────────────────────────────────────

@app.get("/admin/stats")
async def get_stats():
    try:
        return {
            "total_workers": db.users.count_documents({"role": "worker"}),
            "total_contractors": db.users.count_documents({"role": "contractor"}),
            "active_jobs": db.jobs.count_documents({"status": "active"}),
            "completed_jobs": db.jobs.count_documents({"status": "completed"}),
            "total_applications": db.applications.count_documents({}),
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/admin/users")
async def get_all_users(role: Optional[str] = None):
    try:
        query = {}
        if role:
            query["role"] = role
        users = list(db.users.find(query))
        for u in users:
            u["id"] = str(u.pop("_id"))
            u.pop("password", None)
        return users
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.put("/admin/suspend/{user_id}")
async def suspend_user(user_id: str):
    try:
        from bson import ObjectId
        db.users.update_one(
            {"_id": ObjectId(user_id)},
            {"$set": {"status": "suspended"}}
        )
        return {"message": "User suspended"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
async def root():
    return {"message": "Work A Day API is running!"}