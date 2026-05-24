import requests
import os
from dotenv import load_dotenv

load_dotenv()

SERPAPI_KEY = os.getenv("SERPAPI_KEY")
def extract_link(job):
    # 1️⃣ Try apply_options (best)
    if job.get("apply_options"):
        return job["apply_options"][0].get("link")

    # 2️⃣ Try related_links
    if job.get("related_links"):
        return job["related_links"][0].get("link")

    # 3️⃣ Fallback: construct Google job link
    if job.get("job_id"):
        return f"https://www.google.com/search?q={job['job_id']}"

    return None


def clean_platform(via):
    if not via:
        return "Unknown"

    via = via.lower()

    # stronger detection
    if "linkedin" in via:
        return "LinkedIn"
    if "indeed" in via:
        return "Indeed"
    if "glassdoor" in via:
        return "Glassdoor"
    if "ziprecruiter" in via:
        return "ZipRecruiter"

    # fallback
    return via.title()
def search_jobs(query, location=None):
    url = "https://serpapi.com/search.json"

    params = {
        "engine": "google_jobs",
        "q": query,
        "hl": "en",
        "api_key": SERPAPI_KEY
    }

    # ✅ Only add location if valid
    if location and location.strip():
        params["location"] = location

    response = requests.get(url, params=params)
    data = response.json()

    jobs = []

    for job in data.get("jobs_results", []):
        jobs.append({
            "title": job.get("title"),
            "company": job.get("company_name"),
            "location": job.get("location"),
            "platform": clean_platform(job.get("via")),
            "description": job.get("description", ""),
            "link": extract_link(job)
        })

    return jobs