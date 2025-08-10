WHENEVER SQLERROR EXIT SQL.SQLCODE
ALTER SESSION SET CONTAINER=FREEPDB1;
ALTER SESSION SET CURRENT_SCHEMA=ADMIN;

-- Staff Hire Proc 

CREATE OR REPLACE PROCEDURE staff_hire_sp(
 p_staffno IN VARCHAR2,
 p_fname IN VARCHAR2,
 p_lname IN VARCHAR2,
 p_position IN VARCHAR2,
 p_sex IN VARCHAR2,
 p_dob IN DATE,
 p_salary IN NUMBER,
 p_branchno IN VARCHAR2,
 p_telephone IN VARCHAR2, 
 p_mobile IN VARCHAR2,
 p_email IN VARCHAR2
) IS 
  BEGIN
    INSERT INTO DH_STAFF (
      Staffno, fname, lname, position, sex, dob, salary, Branchno, telephone, Mobile, Email
    ) VALUES (
      p_staffno, p_fname, p_lname, p_position, p_sex, p_dob, p_salary, p_branchno, p_telephone, p_mobile, p_email
    );
    COMMIT;
END;
/

-- Update Staff Info 

CREATE OR REPLACE PROCEDURE update_staff_contact_or_salary(
  p_staffno IN VARCHAR2,
  p_salary IN NUMBER,
  p_telephone IN VARCHAR2, 
  p_mobile IN VARCHAR2,
  p_email IN VARCHAR2
) IS 
BEGIN
  UPDATE DH_STAFF
  SET
    salary = NVL(p_salary, salary),
    telephone = NVL(p_telephone, telephone),
    mobile = NVL(p_mobile, Mobile),
    email = NVL(p_email, Email)
  WHERE StaffNo = p_staffno;
  COMMIT; 
END;
/

-- Get Branch Address 

CREATE OR REPLACE FUNCTION get_branch_address(
  p_branchno IN VARCHAR2
) RETURN VARCHAR2 IS 
  v_address VARCHAR2(200);
BEGIN 
  SELECT street || ', ' || city
  INTO v_address
  FROM DH_BRANCH
  WHERE branchno = p_branchno;

  RETURN v_address;
EXCEPTION
  WHEN NO_DATA_FOUND THEN
    RETURN 'Branch Not Found';
END;
/

-- Update Branch Info 

CREATE OR REPLACE PROCEDURE update_branch_details(
  p_branchno IN VARCHAR2,
  p_street IN VARCHAR2, 
  p_city IN VARCHAR2, 
  p_postcode IN VARCHAR2
) IS
BEGIN
  UPDATE DH_BRANCH
    SET
      street = NVL(p_street, street),
      city = NVL(p_city, city),
      postcode = NVL(p_postcode, postcode)
    WHERE Branchno = p_branchno;
  COMMIT;
END; 
/

-- New Branch Procedure

CREATE OR REPLACE PROCEDURE new_branch (
  p_branchno IN VARCHAR2, 
  p_street IN VARCHAR2, 
  p_city IN VARCHAR2, 
  p_postcode IN VARCHAR2
)
IS
BEGIN
  INSERT INTO DH_BRANCH (Branchno, street, city, postcode)
  VALUES (p_branchno, p_street, p_city, p_postcode);
  COMMIT; 
END;
/

-- Register New Client 

CREATE OR REPLACE PROCEDURE client_registration_sp(
  p_clientno IN VARCHAR2,
  p_fname IN VARCHAR2, 
  p_lname IN VARCHAR2, 
  p_telno IN VARCHAR2, 
  p_street IN VARCHAR2, 
  p_city IN VARCHAR2, 
  p_email IN VARCHAR2, 
  p_preftype IN VARCHAR2,
  p_maxrent IN NUMBER
) IS 
BEGIN
  INSERT INTO DH_CLIENT (
    Clientno,
    fname,
    lname,
    telno,
    street,
    city,
    email,
    preftype,
    maxrent
  )
  VALUES (
    p_clientno,
    p_fname,
    p_lname,
    p_telno,
    p_street,
    p_city,
    p_email,
    p_preftype,
    p_maxrent
  );
  COMMIT;
END;
/

-- Delete Client 

CREATE OR REPLACE PROCEDURE delete_client_sp(
  p_clientno IN VARCHAR2
) 
IS 
BEGIN 
  DELETE FROM DH_VIEWING WHERE clientno = p_clientno;
  DELETE FROM DH_REGISTRATION WHERE clientno = p_clientno;
  DELETE FROM DH_LEASE WHERE clientno = p_clientno;
  DELETE FROM DH_CLIENT WHERE clientno = p_clientno;
  COMMIT;
END;
/

SELECT a.table_name,
       a.constraint_name,
       c.owner || '.' || c.r_constraint_name AS parent_fk
FROM user_constraints a
JOIN user_constraints c
  ON a.r_constraint_name = c.constraint_name
WHERE c.table_name = 'DH_CLIENT'
  AND c.constraint_type = 'P';