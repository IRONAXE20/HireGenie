from fastapi import APIRouter

from pydantic import BaseModel

from agents.resume_optimizer import (
    optimize_resume
)

router = APIRouter()


class ResumeOptimizeRequest(
    BaseModel
):

    resume_text: str

    job: dict


@router.post("/optimize")
def optimize_resume_route(
    request:
    ResumeOptimizeRequest
):

    result = optimize_resume(
        request.resume_text,
        request.job
    )

    return {
        "result": result
    }