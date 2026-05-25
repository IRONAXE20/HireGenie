from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.jobs import router as jobs_router
from routes.resume import router as resume_router
from routes.interview import (
    router as interview_router
)
from routes.resume_optimizer import (
    router as resume_optimizer_router
)
app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(jobs_router, prefix="/jobs")
app.include_router(resume_router, prefix="/resume")
app.include_router(
    interview_router,
    prefix="/interview",
    tags=["Interview"]
)
app.include_router(
    resume_optimizer_router,
    prefix="/resume-optimizer",
    tags=["Resume Optimizer"]
)
@app.get("/")
def home():
    return {"message": "AI Service Running"}