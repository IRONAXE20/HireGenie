from utils.api_clients import search_jobs

KEYWORD_SYNONYMS = {

    "python": [
        "django",
        "flask",
        "backend",
        "python engineer",
        "backend developer",
    ],

    "ml": [
        "machine learning",
        "ai",
        "deep learning",
        "ml engineer",
        "ai engineer",
    ],

    "frontend": [
        "react",
        "ui",
        "web frontend",
        "frontend engineer",
    ],

    "backend": [
        "api",
        "server-side",
        "backend engineer",
        "nodejs",
    ],

    "react": [
        "frontend",
        "reactjs",
        "nextjs",
        "ui developer",
    ],

    "data": [
        "data scientist",
        "data analyst",
        "analytics",
        "business intelligence",
    ],

}

def expand_query(query):

    query_lower = query.lower()

    expanded_queries = [query]

    for keyword, synonyms in KEYWORD_SYNONYMS.items():

        if keyword in query_lower:

            expanded_queries.extend(synonyms)

    return list(set(expanded_queries))
def calculate_job_score(job, query):

    score = 0

    title = job.get("title", "").lower()

    description = job.get(
        "description",
        ""
    ).lower()

    combined_text = (
        title + " " + description
    )

    query_lower = query.lower()

    query_words = query_lower.split()

    # Exact title match
    if query_lower in title:
        score += 50

    # Word overlap
    for word in query_words:

        if word in title:
            score += 15

        elif word in description:
            score += 8

    # Entry level detection
    # Penalize senior roles for entry-level searches
    if (
        "entry" in query_lower
        or "junior" in query_lower
        or "fresher" in query_lower
    ):

        senior_terms = [
            "senior",
            "lead",
            "principal",
            "staff",
            "architect",
            "manager",
            "5+ years",
            "7+ years",
        ]

        for term in senior_terms:

            if term in combined_text:
                score -= 45
                break
    if (
        "entry" in query_lower
        or "junior" in query_lower
        or "fresher" in query_lower
    ):

        entry_terms = [
            "junior",
            "entry",
            "associate",
            "fresher",
            "0-2 years",
            "graduate",
        ]

        for term in entry_terms:

            if term in combined_text:
                score += 20
                break

    # Senior level detection
    if "senior" in query_lower:

        senior_terms = [
            "senior",
            "lead",
            "principal",
            "5+ years",
            "7+ years",
            "manager",
        ]

        for term in senior_terms:

            if term in combined_text:
                score += 20
                break

    return min(max(score, 0), 100)
def compute_match_score(job, keywords):

    title = job.get("title", "").lower()
    description = job.get("description", "").lower()

    score = 0

    for keyword in keywords:

        keyword = keyword.lower()

        # title match = stronger
        if keyword in title:
            score += 25

        # description match = weaker
        elif keyword in description:
            score += 10

    return min(score, 100)


def get_jobs(query, location="India"):

    expanded_queries = expand_query(query)

    all_jobs = []

    seen_links = set()

    for expanded_query in expanded_queries:

        jobs = search_jobs(
            expanded_query,
            location
        )

        for job in jobs:

            job_link = job.get("link")

            # Remove duplicates
            if job_link and job_link not in seen_links:

                seen_links.add(job_link)

                job["score"] = calculate_job_score(
                    job,
                    query
                )

                description = (
                    job.get("description", "")
                    .lower()
                )

                resume_keywords = []

                for word in query.lower().split():
                
                    if len(word) > 2:
                        resume_keywords.append(word)

                expanded = expand_query(query)

                resume_keywords.extend(expanded)

                resume_keywords = list(
                    set(resume_keywords)
                )

                matching_skills = []

                for keyword in resume_keywords:
                
                    if keyword in description:
                        matching_skills.append(keyword)

                important_skills = [
                    "aws",
                    "docker",
                    "kubernetes",
                    "sql",
                    "mongodb",
                    "react",
                    "nodejs",
                    "typescript",
                    "tensorflow",
                    "pytorch",
                    "fastapi",
                    "django",
                    "flask",
                ]

                missing_skills = []

                for skill in important_skills:
                
                    if (
                        skill in description
                        and skill not in matching_skills
                    ):
                        missing_skills.append(skill)

                job["matching_skills"] = matching_skills[:5]

                job["missing_skills"] = missing_skills[:5]

                all_jobs.append(job)

    # Sort AFTER collecting all jobs
    all_jobs.sort(
        key=lambda x: x.get("score", 0),
        reverse=True
    )

    return all_jobs