import os 
import oracledb 
import subprocess
from dotenv import load_dotenv
from contextlib import contextmanager
import re 

load_dotenv()

ORACLE_USER = os.getenv("ORACLE_USER", "admin")
ORACLE_PASSWORD = os.getenv("ORACLE_PASSWORD", "admin")
ORACLE_HOST = "localhost"
ORACLE_PORT = "1521"
ORACLE_SERVICE = "FREEPDB1"
ORACLE_DSN = oracledb.makedsn(ORACLE_HOST, ORACLE_PORT, service_name=ORACLE_SERVICE)

class DataBaseManager: 
    def __init__(self, logger, username: str = ORACLE_USER, password: str = ORACLE_PASSWORD, oracle_dsn: str = ORACLE_DSN, ):
        self.username = username
        self.password = password
        self.dsn = oracle_dsn
        self.logger = logger

    @contextmanager
    def get_connection(self):
        conn = None 
        try: 
            conn = oracledb.connect(
                user=self.username,
                password=self.password,
                dsn=self.dsn,
            )
            yield conn 

        except ConnectionError as e:
            if conn:
                conn.rollback()
            raise e
        finally:
            if conn:
                conn.close()

    @contextmanager
    def cursor(self):
        with self.get_connection() as conn:
            cur = conn.cursor()
            try:
                yield cur, conn
            finally:
                cur.close()

    def call_procedure(self, procedure_name: str, args: list):
        with self.cursor() as (cur, conn):
            cur.callproc(procedure_name, args)
            conn.commit()