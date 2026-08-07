from app.core.paths import PROMPTS_DIR


class PromptLoader:

    def load(
        self,
        module: str,
        version: str = "v1",
    ):

        prompt_path = (
            PROMPTS_DIR
            / module
            / f"{version}.md"
        )

        with open(
            prompt_path,
            encoding="utf-8",
        ) as file:

            return file.read()
        
    def list_modules(self):

        modules = []

        for folder in PROMPTS_DIR.iterdir():

            if folder.is_dir():

                modules.append(
                    folder.name
                )

        return modules
    
    def list_versions(
        self,
        module: str
    ):

        folder = PROMPTS_DIR / module

        if not folder.exists():
            return []

        versions = []

        for file in folder.glob("*.md"):

            versions.append(file.stem)

        return sorted(versions)

    def get_prompt(
        self,
        module: str,
        version: str
    ):

        return self.load(module, version)

    def save(
        self,
        module: str,
        version: str,
        content: str
    ):

        folder = PROMPTS_DIR / module

        folder.mkdir(
            exist_ok=True
        )

        with open(
            folder / f"{version}.md",
            "w",
            encoding="utf-8"
        ) as file:

            file.write(content)

    def delete(
        self,
        module: str,
        version: str
    ):

        path = (
            PROMPTS_DIR
            / module
            / f"{version}.md"
        )

        if path.exists():
            path.unlink()