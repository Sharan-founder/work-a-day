import { CONFIG } from '../constants/config';

const BASE_URL = CONFIG.API_URL;

export async function sendOTP(phone: string) {
  const res = await fetch(`${BASE_URL}/auth/send-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone }),
  });
  return res.json();
}

export async function verifyOTP(phone: string, otp: string) {
  const res = await fetch(`${BASE_URL}/auth/verify-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone, otp }),
  });
  return res.json();
}

export async function setupWorker(phone: string, profile: object) {
  const res = await fetch(`${BASE_URL}/worker/setup?phone=${phone}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(profile),
  });
  return res.json();
}

export async function setupContractor(phone: string, profile: object) {
  const res = await fetch(`${BASE_URL}/contractor/setup?phone=${phone}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(profile),
  });
  return res.json();
}

export async function getJobs(city?: string, skill?: string, minWage?: number) {
  let url = `${BASE_URL}/jobs?`;
  if (city) url += `city=${city}&`;
  if (skill) url += `skill=${skill}&`;
  if (minWage) url += `min_wage=${minWage}`;
  const res = await fetch(url);
  return res.json();
}

export async function postJob(phone: string, job: object) {
  const res = await fetch(`${BASE_URL}/jobs?phone=${phone}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(job),
  });
  return res.json();
}

export async function applyJob(jobId: string, workerId: string) {
  const res = await fetch(`${BASE_URL}/jobs/apply`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ job_id: jobId, worker_id: workerId }),
  });
  return res.json();
}

export async function getApplicants(jobId: string) {
  const res = await fetch(`${BASE_URL}/jobs/${jobId}/applicants`);
  return res.json();
}

export async function getAdminStats() {
  const res = await fetch(`${BASE_URL}/admin/stats`);
  return res.json();
}

export async function getAdminUsers(role?: string) {
  let url = `${BASE_URL}/admin/users`;
  if (role) url += `?role=${role}`;
  const res = await fetch(url);
  return res.json();
}
export async function getContractorJobs(phone: string) {
  const res = await fetch(`${BASE_URL}/contractor/jobs?phone=${phone}`);
  return res.json();
}