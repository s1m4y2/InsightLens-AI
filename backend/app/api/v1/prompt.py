from fastapi import APIRouter
from app.clients.client_factory import ClientFactory
from app.loaders.prompt_loader import PromptLoader
from app.utils.json_parser import parse_json
from app.schemas.prompt import (PromptTestRequest, PromptCompareRequest, PromptCreateRequest)
from fastapi import Depends
from app.security.roles import require_role


router = APIRouter(
    prefix="/api/v1/prompt",
    tags=["Prompt"]
)

client = ClientFactory.create()
loader = PromptLoader()

@router.post("/test")
def test_prompt(request: PromptTestRequest):

    prompt = loader.get_prompt(
        request.module,
        request.version
    )

    for key, value in request.variables.items():

        prompt = prompt.replace(
            "{{" + key + "}}",
            str(value)
        )

    response = client.generate(prompt)

    try:
        return parse_json(response)

    except:
        return {
            "response": response
        }
    
@router.post("/compare")
def compare_prompts(
    request: PromptCompareRequest
):

    results = {}

    for version in request.versions:

        prompt = loader.get_prompt(
            request.module,
            version
        )

        for key, value in request.variables.items():

            prompt = prompt.replace(
                "{{"+key+"}}",
                str(value)
            )

        response = client.generate(prompt)

        try:

            results[version] = parse_json(
                response
            )

        except:

            results[version] = response

    return results

@router.get("")
def list_prompts():

    loader = PromptLoader()

    return loader.list_modules()

@router.get("/{module}")
def list_versions(module: str):

    loader = PromptLoader()

    return loader.list_versions(module)

@router.get("/{module}/{version}")
def get_prompt(
    module: str,
    version: str
):

    return {
        
        "module": module,

        "version": version,

        "content": loader.get_prompt(
            module,
            version
        )

    }

@router.delete("/{module}/{version}")
def delete_prompt(module: str, version: str):

    loader.delete(module, version)

    return {"message":"Deleted."}

@router.post("")
def create_prompt(request: PromptCreateRequest):

    loader.save(
        request.module,
        request.version,
        request.content
    )

    return {
        "message": "Prompt created."
    }


@router.put("")
def update_prompt(
    request: PromptCreateRequest
):

    loader.save(
        request.module,
        request.version,
        request.content
    )

    return {
        "message": "Prompt updated."
    }

