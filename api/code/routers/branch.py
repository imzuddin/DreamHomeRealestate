from fastapi import APIRouter, HTTPException, Request, status
from pydantic import BaseModel 
from typing import Optional
from utils.database import DataBaseManager
import logging 

logger = logging.getLogger("api.branch")
db_manager = DataBaseManager(logger)

router = APIRouter(
    prefix="/branch"
)

class BranchCreate(BaseModel):
    branchno: str
    street: str
    city: str
    postcode: str

class BranchUpdate(BaseModel):
    street: Optional[str] = None 
    ciy: Optional[str] = None 
    postcode: Optional[str] = None 

@router.post("/create_branch", status_code=status.HTTP_201_CREATED)
async def create_branch(branch: BranchCreate):
    args = [
        branch.branchno,
        branch.street,
        branch.city,
        branch.postcode
    ]

    db_manager.call_procedure("new_branch", args)
    return {"message": "Branch Created"}

@router.patch("/update_branch/{branchno}")
async def update_branch(branchno: str, payload: BranchUpdate):
    args = [
        branchno,
        payload.street,
        payload.city,
        payload.postcode
    ]

    db_manager.call_procedure("update_branch_details", args)
    return {"message": f"Branch with id: {branchno} updated"}

@router.get("/{branchno}/address")
async def get_branch_address(branchno: str):
    with db_manager.cursor() as (cur, conn):
        address: str = cur.callfunc("get_branch_address", STRING, [branchno])
    if address == "Branch Not Found":
        raise HTTPException(status_code=404, detail="Branch Not Found")
    return {"address": address}
