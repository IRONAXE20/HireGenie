from agents.groq_client import client


def generate_interview_prep(job):

    title = job.get(
        "title",
        ""
    )

    description = job.get(
        "description",
        ""
    )[:1000]

    prompt = f"""
    You are an expert interview coach.

    Job Title:
    {title}

    Job Description:
    {description}

    Generate:

    1. 5 technical interview questions
    2. 3 HR interview questions
    3. Important topics to prepare

    Keep it concise and structured.
    """

    completion = (
        client.chat.completions.create(

            model="llama-3.1-8b-instant",

            messages=[
                {
                    "role": "user",
                    "content": prompt,
                }
            ],

            temperature=0.4,

            max_tokens=250,
        )
    )

    return completion.choices[
        0
    ].message.content