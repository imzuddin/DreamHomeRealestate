import logging
from datetime import date
from typing import List

from fastapi import APIRouter, HTTPException, Request, status
from pydantic import BaseModel
from utils.database import DataBaseManager

logger = logging.getLogger("api.client")
db_manager = DataBaseManager(logger)

router = APIRouter(prefix="/clients")


class NewClient(BaseModel):
    clientno: str
    fname: str
    lname: str
    telno: str
    street: str
    city: str
    email: str
    preftype: str
    maxrent: float


@router.post("/new_client", status_code=status.HTTP_201_CREATED)
async def register_client(client: NewClient):
    args = [
        client.clientno,
        client.fname,
        client.lname,
        client.telno,
        client.street,
        client.city,
        client.email,
        client.preftype,
        client.maxrent,
    ]

    db_manager.call_procedure("client_registration_sp", args)
    return {"message": f"{client.fname} {client.lname} registered as client"}


@router.delete("/delete_client/{clientno}")
async def delete_client(clientno: str):
    db_manager.call_procedure("delete_client_sp", [clientno])
    return {"message": f"Deleted client with id: {clientno}"}


@router.get("/get_clients", response_model=List[NewClient])
async def list_clients():
    sql = """
        SELECT * FROM DH_CLIENT
    """

    with db_manager.cursor() as (cur, conn):
        cur.execute(sql)
        rows = cur.fetchall()

    return [
        NewClient(
            clientno=row[0],
            fname=row[1],
            lname=row[2],
            telno=row[3],
            street=row[4],
            city=row[5],
            email=row[6],
            preftype=row[7],
            maxrent=row[8],
        )
        for row in rows
    ]
