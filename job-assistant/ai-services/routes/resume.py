from fastapi import APIRouter, UploadFile, File
from services.resume_service import analyze_resume
import tempfile

router = APIRouter()

@router.post("/analyze")

async def analyze_resume_route(
    file: UploadFile = File(...)
):

    # create temporary file
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:

        content = await file.read()

        temp_file.write(content)

        temp_path = temp_file.name

    result = analyze_resume(temp_path)

    return result