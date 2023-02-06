import os
import shutil
from datetime import date
import pymysql
import dbinsert
import firebase
from firebase_admin import credentials, initialize_app, storage
import asyncio;
import websockets

__author__ = "Pheewhy"
__version__ = '0.1'
__license__ = 'TLS TLSv1.3'

conn = pymysql.connect(host='localhost', user='root', password='gLAtic90()', db='mqtt', charset='utf8')
cursor = conn.cursor()

def main():
    print('main 실행')
    while True:
        print("실행")
        file = 'C:\\MQTT\\client\\info.txt'
        if os.path.isfile(file):
            global uid
            # client 정보 저장
            uid = str(ilist()[0])
            country = str(ilist()[1])
            state = str(ilist()[2])
            local = str(ilist()[3])
            company = str(ilist()[4])
            section = str(ilist()[5])
            common = str(ilist()[6])
            
            # client 폴더 확인 및 생성
            file = 'c:\\MQTT\\client\\cert\\'+uid
            if os.path.isfile(file):
                continue
            else:
                os.system('mkdir '+file)

            day = date.today().isoformat()

            # client.csr 파일 생성
            os.system('openssl.exe genrsa -out c:\\MQTT\\client\\cert\\'+uid+'\\'+uid+'-'+day+'.key 2048')
            os.system('openssl.exe req -new -days 100 -nodes -x509 -subj /C='+country+'/ST='+state+'/L='+local+'/O='+company+'/OU='+section+'/CN='+common+' -keyout c:\\MQTT\\client\\cert\\'+uid+'\\'+uid+'-'+day+'.key -out c:\\MQTT\\client\\cert\\'+uid+'\\'+uid+'-'+day+'.crt')

            # info.txt 이름 변경 및 경로이동
            shutil.move('C:\\MQTT\\client\\info.txt', 'C:\\MQTT\\client\\cert\\'+uid+'\\'+uid+'.txt')

            # db insert
            # fb insert ca.crt
            global ca_crt
            ca_crt = firebase.caInsert()
            # fb upload client.key
            c_key = firebase.keyInsert('c:\\MQTT\\client\\cert\\'+uid+'\\'+uid+'-'+day+'.key')
            # fb upload client.crt
            c_crt = firebase.crtInsert('c:\\MQTT\\client\\cert\\'+uid+'\\'+uid+'-'+day+'.crt')
            # db upload clientinfo
            dbinsert.insert(uid, country, state, local, company, section, common, ca_crt, c_key, c_crt)
            print("success")
            break    
        else:
            print("there is no info file")
            break

def getinfo():
    f = open("C:/MQTT/client/info.txt", 'r')
    for info in f:
        return info
    f.close()
    
def ilist():
    info = getinfo().split(" ")
    uid = info[info.index("uid")+1]
    country = info[info.index("country")+1]
    state = info[info.index("state")+1]
    local = info[info.index("local")+1]
    company = info[info.index("company")+1]
    section = info[info.index("section")+1]
    common = info[info.index("common")+1]
    infolist = [uid, country, state, local, company, section, common]
    return infolist 
    
def send():
    ca = dbinsert.searchCA(uid)
    key = dbinsert.searchKEY(uid)
    crt = dbinsert.searchCRT(uid)
    client = [ca, key, crt]
    return client

main()
