from utils.parser import extract_text_from_pdf
from agents.keyword_extractor import extract_keywords

def analyze_resume(file):

    text = extract_text_from_pdf(file)

    keywords = extract_keywords(text)

    return {
        "text": text,
        "keywords": keywords
    }