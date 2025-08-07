import os
import re
import subprocess
from contextlib import contextmanager

import oracledb
from dotenv import load_dotenv

load_dotenv()

ORACLE_USER = os.getenv("ORACLE_USER", "admin")
ORACLE_PASSWORD = os.getenv("ORACLE_PASSWORD", "admin")
ORACLE_HOST = "localhost"
ORACLE_PORT = "1521"
ORACLE_SERVICE = "FREEPDB1"
ORACLE_DSN = oracledb.makedsn(ORACLE_HOST, ORACLE_PORT, service_name=ORACLE_SERVICE)


class DataBaseManager:
    def __init__(
        self,
        logger,
        username: str = ORACLE_USER,
        password: str = ORACLE_PASSWORD,
        oracle_dsn: str = ORACLE_DSN,
    ):
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

    def init_users_table(self):
        ddl = """
        BEGIN
          EXECUTE IMMEDIATE 'CREATE TABLE USERS (
            username   VARCHAR2(50) PRIMARY KEY,
            pwd_hash   VARCHAR2(100) NOT NULL,
            role       VARCHAR2(20)   NOT NULL
          )';
        EXCEPTION
          WHEN OTHERS THEN
            IF SQLCODE != -955 THEN  -- ORA-00955: name is already used
              RAISE;
            END IF;
        END;"""

        seed = [
            ("admin", "adminpass", "admin"),
            ("staff", "staffpass", "staff"),
        ]

        self.logger.info(seed)

        with self.cursor() as (cur, conn):
            cur.execute(ddl)
            for u, p, r in seed:
                cur.execute(
                    """
                  MERGE INTO USERS tgt
                  USING (SELECT :u AS username, :p AS pwd_hash, :r AS role FROM dual) src
                  ON (tgt.username = src.username)
                  WHEN NOT MATCHED THEN
                    INSERT (username, pwd_hash, role)
                    VALUES (src.username, src.pwd_hash, src.role)
                """,
                    [u, p, r],
                )
            conn.commit()

    def check_credentials(self, username: str, password: str):
        """
        Returns the role if the password matches, otherwise None.
        """
        self.logger.info(f"username: {username}, password: {password}")

        sql = "SELECT pwd_hash, role FROM USERS WHERE username = :u"
        with self.cursor() as (cur, conn):
            cur.execute(sql, [username])
            row = cur.fetchone()
        if row and row[0] == password:
            return row[1]
        return None
