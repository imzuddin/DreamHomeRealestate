import logging
from typing import List, Optional

from fastapi import APIRouter, HTTPException, Request, status
from pydantic import BaseModel
from utils.database import DataBaseManager

logger = logging.getLogger("api.login")
db_manager = DataBaseManager(logger)

router = APIRouter(prefix="/login")


class LoginRequest(BaseModel):
    username: str
    password: str


class LoginResponse(BaseModel):
    role: str


@router.post("/login", response_model=LoginResponse)
async def login(request: LoginRequest):

    role = db_manager.check_credentials(str(request.username), str(request.password))

    if not role:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Credentials"
        )

    return {"role": role}
