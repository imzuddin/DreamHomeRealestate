import os 
from fastapi import FastAPI, Request, HTTPException 
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware 
from dotenv import load_dotenv 

load_dotenv()

app = FastAPI(
    title="Dream Home Realestate API",
    version=os.getenv("VERSION", "0.1.0")
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health_endpoint", tags=["health"])
def healthcheck():
    return { "status": "ok" }