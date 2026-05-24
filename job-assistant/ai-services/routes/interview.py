from fastapi import APIRouter

from pydantic import BaseModel

from agents.interview_agent import (
    generate_interview_prep
)

router = APIRouter()


class InterviewRequest(
    BaseModel
):

    job: dict


@router.post("/prep")
def prepare_interview(
    request: InterviewRequest
):

    prep = generate_interview_prep(
        request.job
    )

    return {
        "prep": prep
    }