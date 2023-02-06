from firebase_admin import credentials, initialize_app, storage

cred = credentials.Certificate('C:/MQTT/client/cert/mqtt-f374a-firebase-adminsdk-lhgh4-239d906170.json')
initialize_app(cred, {'storageBucket': 'mqtt-f374a.appspot.com'})

def caInsert():
    file = "C:/MQTT/client/cert/ca.crt"
    bucket = storage.bucket()
    blob = bucket.blob(file)
    blob.upload_from_filename(file)
    blob.make_public()
    return blob.public_url

def crtInsert(url):
    bucket1 = storage.bucket()
    c_blob1 = bucket1.blob(url)
    c_blob1.upload_from_filename(url)
    c_blob1.make_public()
    return c_blob1.public_url

def keyInsert(url):
    bucket2 = storage.bucket()
    c_blob2 = bucket2.blob(url)
    c_blob2.upload_from_filename(url)
    c_blob2.make_public()
    return c_blob2.public_url