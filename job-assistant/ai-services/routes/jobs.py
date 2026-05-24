from fastapi import APIRouter

from services.job_service import get_jobs

from agents.explainer import (
    generate_fit_analysis
)

from pydantic import BaseModel

router = APIRouter()


class AnalyzeRequest(BaseModel):

    keywords: str

    job: dict


# NORMAL JOB SEARCH
@router.get("/search")
def search_jobs_route(
    query: str,
    location: str = ""
):

    jobs = get_jobs(
        query,
        location
    )

    return {
        "count": len(jobs),
        "jobs": jobs
    }


# AI ANALYSIS
@router.post("/analyze")
def analyze_job(
    request: AnalyzeRequest
):

    analysis = generate_fit_analysis(
        request.keywords,
        request.job
    )

    return {
        "analysis": analysis
    }