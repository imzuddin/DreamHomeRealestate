import os 
from fastapi import FastAPI, Request, HTTPException 
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware 
from routers import branch, client, staff
from dotenv import load_dotenv
import logging

load_dotenv()
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s [%(name)s] %(message)s",
)

app = FastAPI(
    title="Dream Home Realestate API",
    version=os.getenv("VERSION", "0.1.0")
)
logger = logging.getLogger("api.main")

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

@app.on_event("startup")
async def startup_event():
    logger.info(f"✅ API Started")

@app.get("/health_endpoint", tags=["health"])
def healthcheck():
    return { "status": "ok" }