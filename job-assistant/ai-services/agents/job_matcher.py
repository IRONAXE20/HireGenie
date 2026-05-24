def compute_match_score(job, keywords):
    text = f"{job.get('title','')} {job.get('company','')} {job.get('description','')}".lower()

    score = 0
    for keyword in keywords:
        if keyword.lower() in text:
            score += 1

    return score