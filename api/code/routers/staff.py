from fastapi import APIRouter, HTTPException, Request, status
from pydantic import BaseModel 
from typing import Optional, List
from utils.database import DataBaseManager
import logging 
from datetime import date 

logger = logging.getLogger("api.staff")

db_manager = DataBaseManager(logger)

router = APIRouter(
    prefix="/staff"
)

class Staff(BaseModel):
    staffno: str
    fname: str
    lname: str
    position: str
    sex: str
    dob: str
    salary: float
    branchno: str
    telephone: str
    mobile: str
    email: str

class StaffUpdate(BaseModel):
    salary: Optional[float] = None
    telephone: Optional[str] = None
    mobile: Optional[str] = None
    email: Optional[str] = None 

@router.post("/hire", status_code=status.HTTP_201_CREATED)
async def hire_staff(payload: Staff, request: Request):
    dob_date = date.fromisoformat(payload.dob)
    
    args = [
        payload.staffno,
        payload.fname,
        payload.lname,
        payload.position,
        payload.sex,
        dob_date,
        payload.salary,
        payload.branchno,
        payload.telephone,
        payload.mobile,
        payload.email
    ]

    db_manager.call_procedure("staff_hire_sp", args)
    return {"message": "Staff Hired Successfully"}
   
@router.patch("/update_staff/{staffno}")
async def update_staff_contact(
    staffno: str, updates: StaffUpdate, request: Request
):
    args = [
        staffno,
        updates.salary,
        updates.telephone,
        updates.mobile,
        updates.email
    ]

    db_manager.call_procedure("update_staff_contact_or_salary", args)
    return {"message": f"Updated Staff with id: {staffno}"}

@router.get("/get_staff", response_model=List[Staff])
async def list_Staff():
    sql = """
        SELECT * FROM DH_STAFF
    """

    with db_manager.cursor() as (cur, conn):
        cur.execute(sql)
        rows = cur.fetchall()
    
    return [
        Staff(
            staffno=row[0],
            fname=row[1],
            lname=row[2],
            position=row[3],
            sex=row[4],
            dob=str(row[5]),
            salary=row[6],
            branchno=row[7],
            telephone=row[8],
            mobile=row[9],
            email=row[10],
        ) for row in rows
    ]