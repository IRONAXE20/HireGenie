from agents.groq_client import client


def optimize_resume(
    resume_text,
    job,
):

    title = job.get(
        "title",
        ""
    )

    description = job.get(
        "description",
        ""
    )[:1500]

    prompt = f"""
    You are an expert ATS resume reviewer.

    Resume:
    {resume_text[:4000]}

    Target Job:
    {title}

    Job Description:
    {description}

    Analyze the resume and provide:

    1. ATS Match Score out of 100
    2. Missing skills/keywords
    3. Resume improvement suggestions
    4. An optimized rewritten version of the resume

    Keep response structured and concise.
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

            max_tokens=1400,
        )
    )

    return completion.choices[
        0
    ].message.content