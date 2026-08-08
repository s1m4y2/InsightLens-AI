from fastapi import APIRouter, Depends

from app.clients.client_factory import ClientFactory
from app.loaders.prompt_loader import PromptLoader
from app.utils.json_parser import parse_json

from app.schemas.prompt import (
    PromptTestRequest,
    PromptCompareRequest,
    PromptCreateRequest
)

from app.security.roles import require_role
from app.services.notification_service import NotificationService


router = APIRouter(
    prefix="/api/v1/prompt",
    tags=["Prompt"]
)

client = ClientFactory.create()
loader = PromptLoader()
notification_service = NotificationService()

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
def delete_prompt(
    module: str,
    version: str,
    user=Depends(require_role("ADMIN"))
):

    loader.delete(
        module,
        version
    )

    notification_service.create(

        user_id=user.id,

        title="Prompt deleted",

        description=(
            f"{module} "
            f"{version} deleted successfully."
        ),

        type="prompt"

    )

    return {
        "message": "Deleted."
    }

@router.post("")
def create_prompt(
    request: PromptCreateRequest,
    user=Depends(require_role("ADMIN"))
):

    loader.save(
        request.module,
        request.version,
        request.content
    )

    notification_service.create(

        user_id=user.id,

        title="Prompt created",

        description=(
            f"{request.module} "
            f"{request.version} created successfully."
        ),

        type="prompt"

    )

    return {
        "message": "Prompt created."
    }


@router.put("")
def update_prompt(
    request: PromptCreateRequest,
    user=Depends(require_role("ADMIN"))
):

    loader.save(
        request.module,
        request.version,
        request.content
    )

    notification_service.create(

        user_id=user.id,

        title="Prompt updated",

        description=(
            f"{request.module} "
            f"{request.version} updated successfully."
        ),

        type="prompt"

    )

    return {
        "message": "Prompt updated."
    }

