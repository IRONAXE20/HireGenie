import streamlit as st
from agents.groq_client import client
#from config import GROQ_API_KEY

#from groq_client import client

@st.cache_data
def get_skill_gap(job, keywords):
    prompt = f"""
    You are an AI career coach.

    Candidate skills:
    {keywords}

    Job:
    Title: {job.get('title')}
    Company: {job.get('company')}

    List the missing or weaker skills the candidate should improve.

    Give 3-5 short bullet points only.
    """

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "user", "content": prompt}
        ]
    )

    return response.choices[0].message.content