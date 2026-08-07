import json


def parse_json(text: str):
    """
    Gemini'den dönen JSON string'ini Python dict'e çevirir.
    """

    text = text.strip()

    if text.startswith("```json"):
        text = text.replace("```json", "")

    if text.endswith("```"):
        text = text.replace("```", "")

    text = text.strip()

    return json.loads(text)