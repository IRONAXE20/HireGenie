from agents.groq_client import client

def extract_keywords(text):

    prompt = f"""
    Extract ONLY technical keywords from this resume.

    Rules:
    - Return comma-separated keywords ONLY
    - No explanations
    - No sentences
    - No numbering
    - No bullet points
    - Max 12 keywords
    - Include:
      programming languages,
      frameworks,
      AI/ML tools,
      databases,
      cloud tools,
      job roles

    Resume:
    {text[:3000]}
    """

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    keywords = response.choices[0].message.content
    keywords = keywords.replace("\n", ",")
    # clean output
    keywords = (
        keywords
        .replace(".", "")
        .replace("\n", "")
        .replace("Here are the extracted job-related keywords including job roles skills and technologies in a comma-separated list:", "")
    )

    keywords = ",".join([
        k.strip()
        for k in keywords.split(",")
        if k.strip()
    ])

    return keywords