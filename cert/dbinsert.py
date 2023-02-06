import pymysql

conn = pymysql.connect(host='localhost', user='root', password='gLAtic90()', db='mqtt', charset='utf8')
cursor = conn.cursor()

def insert(uid, country, state, local, company, section, common, ca_crt, c_key, c_crt):
    # db insert
    sql = "INSERT INTO clientinfo (uid, country, state, locals, company, section, common, ca_crt, c_key, c_crt) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
    with conn:
        with conn.cursor() as cur:
            cur.execute(sql, (uid, country, state, local, company, section, common, ca_crt, c_key, c_crt))
            conn.commit()

def searchCA(uid):
    sql = "SELECT ca_crt FROM clientinfo WHERE uid = %s"
    with conn:
        with conn.cursor() as cur:
            cur.excute(sql, (uid))
            result = cur.fetchall()
            return result

def searchKEY(uid):
    sql = "SELECT c_key FROM clientinfo WHERE uid = %s"
    with conn:
        with conn.cursor() as cur:
            cur.excute(sql, (uid))
            result = cur.fetchall()
            return result

def searchCRT(uid):
    sql = "SELECT c_crt FROM clientinfo WHERE uid = %s"
    with conn:
        with conn.cursor() as cur:
            cur.excute(sql, (uid))
            result = cur.fetchall()
            return result