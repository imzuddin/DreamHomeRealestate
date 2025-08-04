import os 
import oracledb 
from dotenv import load_dotenv
from contextlib import contextmanager

load_dotenv()

ORACLE_USER = os.getenv("ORACLE_USER", "admin")
ORACLE_PASSWORD = os.getenv("ORACLE_PASSWORD", "admin")
ORACLE_DSN = os.getenv("ORACLE_DSN", "oracle:1521/XE")

class DataBaseManager: 
    def __init__(self, username: str = ORACLE_USER, password: str = ORACLE_PASSWORD, oracle_dsn: str = ORACLE_DSN):
        self.username = username
        self.password = password
        self.dsn = oracle_dsn

    @contextmanager
    def get_connection(self):
        conn = None 
        try: 
            conn = oracledb.connect(
                user=self.username,
                password=self.password,
                dsn=self.dsn,
                encoding="UTF-8",
                timeout = 10 
            )
            yield conn 

        except Exception:
            if conn:
                conn.rollback()
            raise
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

        
