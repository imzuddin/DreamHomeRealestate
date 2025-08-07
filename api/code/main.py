import logging
import os

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from routers import branch, client, login, staff
from utils.database import DataBaseManager

load_dotenv()
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s [%(name)s] %(message)s",
)

app = FastAPI(title="Dream Home Realestate API", version=os.getenv("VERSION", "0.1.0"))
logger = logging.getLogger("api.main")
db_manager = DataBaseManager(logger)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(branch.router)
app.include_router(client.router)
app.include_router(staff.router)
app.include_router(login.router)


@app.on_event("startup")
async def startup_event():
    db_manager.init_users_table()

    logger.info(f"✅ API Started")


@app.get("/health_endpoint", tags=["health"])
def healthcheck():
    return {"status": "ok"}
