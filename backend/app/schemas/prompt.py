from pydantic import BaseModel


class PromptTestRequest(BaseModel):

    module: str

    version: str = "v1"

    variables: dict


class PromptCompareRequest(BaseModel):

    module: str

    versions: list[str]

    variables: dict


class PromptCreateRequest(BaseModel):

    module: str

    version: str

    content: str