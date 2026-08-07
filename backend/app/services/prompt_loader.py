from pathlib import Path

from app.core.paths import PROMPTS_DIR


def load_prompt(
    module: str,
    version: str = "v1"
):

    prompt_path = (
        PROMPTS_DIR
        / module
        / f"{version}.md"
    )

    with open(
        prompt_path,
        encoding="utf-8"
    ) as file:

        return file.read()