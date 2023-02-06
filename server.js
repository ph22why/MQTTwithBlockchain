const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const app = express();
const wsModule = require('ws');
const path = require('path');
const fs = require('fs');

const mysql = require("mysql");
const dbConfig = require("C:/MQTT/client/app/config/db.config.js");

// 데이터베이스 connection 객체 생성
const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
});

connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database. ");
})

const { exec } = require('child_process');
const { resolve } = require("path");
const { send } = require("process");

require("./app/routes/client.routes.js")(app);

// 포트넘버 설정
const HTTPServer = app.listen(3000, () => {
    console.log("Server is open at port:3000");
});

const webSocketServer = new wsModule.Server(
    {
        server: HTTPServer,
        // port: 3000 // WebSocket연결에 사용할 port를 지정한다(생략시, http서버와 동일한 port 공유 사용)
    }
);

webSocketServer.on('connection', (ws, request) => {
    // 1) 연결 클라이언트 IP 취득
    const ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;

    console.log(`새로운 클라이언트[${ip}] 접속`);

    // 2) 클라이언트에게 메시지 전송
    if (ws.readyState === ws.OPEN) { // 연결 여부 체크
        ws.send(`**클라이언트[${ip}] 접속을 환영합니다 from 서버`); // 데이터 전송
    }

    // 3) 클라이언트로부터 메시지 수신 이벤트 처리
    ws.on('message', (msg) => {
        console.log(`클라이언트[${ip}]에게 수신한 메시지 : ${msg}`);
        const content = 'uid ' + msg + ' country KR state Incheon local Jamsil company Glatic section Client common DESKTOP-FACVTG2';
        try {
            fs.writeFileSync('C:/MQTT/client/info.txt', content);
        } catch (err) {
            console.log(err);
        }
        function send() {
            var ca_sql = 'SELECT ca_crt FROM clientinfo WHERE uid = ?';
            var key_sql = 'SELECT c_key FROM clientinfo WHERE uid = ?';
            var crt_sql = 'SELECT c_crt FROM clientinfo WHERE uid = ?';
            var params = msg;
            var crt;
            var key;
            var ccrt;

            connection.query(ca_sql, params, function (err, rows) {
                if (err) {
                    console.log(err);
                } else {
                    ws.send(rows[0].ca_crt);
                    crt = rows[0].ca_crt;
                    console.log(crt);
                }
            })
            connection.query(key_sql, params, function (err, rows) {
                if (err) {
                    console.log(err);
                } else {
                    ws.send(rows[0].c_key);
                    key = rows[0].c_key;
                    console.log(key);
                }
            })
            connection.query(crt_sql, params, function (err, rows) {
                if (err) {
                    console.log(err);
                } else {
                    ws.send(rows[0].c_crt);
                    ccrt = rows[0].c_crt;
                    console.log(ccrt);
                }
            })
            // urls = 'ca.crt : '+
            
            router.get(ca_sql, (req, res, next) => {
                const ca_crt = 'ca.crt';
                res.setHeader('Content-Disposition', `attachment; filename=${ca_crt}`); // 이게 핵심 
                res.sendFile('C:\\cert\\');
            });
            router.get(key_sql, (req, res, next) => {
                const c_key = `${params}.key`;
                res.setHeader('Content-Disposition', `attachment; filename=${c_key}`); // 이게 핵심 
                res.sendFile('C:\\cert\\');
            });
            router.get(crt_sql, (req, res, next) => {
                const c_crt = `${params}.crt`;
                res.setHeader('Content-Disposition', `attachment; filename=${c_crt}`); // 이게 핵심 
                res.sendFile('C:\\cert\\');
            });
        }
        function pyth() {
            console.log("pyth 호출");
            exec('python C:\\MQTT\\client\\cert\\openssl.py', (error, stdout, stderr) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    return;
                }
                console.log(`stdout: ${stdout}`);
                console.log(`stderr: ${stderr}`);
                setTimeout(() => {
                    send();
                }, 1500
                );
            });
        }
        pyth();
        console.log('python 실행');
    })

    // 4) 에러 처러
    ws.on('error', (error) => {
        console.log(`클라이언트[${ip}] 연결 에러발생 : ${error}`);
    })

    // 5) 연결 종료 이벤트 처리
    ws.on('close', () => {
        console.log(`클라이언트[${ip}] 웹소켓 연결 종료`);
    })


});