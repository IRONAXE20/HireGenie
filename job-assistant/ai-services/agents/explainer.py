from agents.groq_client import client


def generate_fit_analysis(
    resume_keywords,
    job
):

    title = job.get(
        "title",
        ""
    )

    description = job.get(
        "description",
        ""
    )[:1200]

    prompt = f"""
    Candidate Skills:
    {resume_keywords}

    Job Title:
    {title}

    Job Description:
    {description}

    Your task:
    1. Explain in 3-4 lines why this candidate
       is suitable for this role.

    2. Mention specific matching skills.

    3. Mention 2-3 missing skills ONLY if important.

    IMPORTANT:
    - Never say "No strong skill matches detected"
    - Always identify at least some transferable skills
    - Keep response concise
    - Sound like a professional AI career coach
    """

    try:

        completion = client.chat.completions.create(

            model="llama-3.1-8b-instant",

            messages=[
                {
                    "role": "user",
                    "content": prompt,
                }
            ],

            temperature=0.4,

            max_tokens=180,
        )

        return completion.choices[
            0
        ].message.content

    except Exception as e:

        print(e)

        return (
            "AI analysis unavailable."
        )