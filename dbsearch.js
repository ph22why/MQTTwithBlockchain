const mysql = require("mysql");
const dbConfig = require("C:/MQTT/client/app/config/db.config.js");

var ca_sql = 'SELECT ca_crt FROM clientinfo WHERE uid = ?';
var key_sql = 'SELECT c_key FROM clientinfo WHERE uid = ?';
var crt_sql = 'SELECT c_crt FROM clientinfo WHERE uid = ?';
var crt;
var key;
var ccrt;

window.onload = function findca(params){
    connection.query(ca_sql, params, function(err, rows){
        if(err){
            console.log(err);
        }else{
            crt = rows[0].ca_crt;
            console.log(crt);
            return crt;
        }
    })
}

window.onload = function findkey(params){
    connection.query(key_sql, params, function(err, rows){
        if(err){
            console.log(err);
        }else{
            key = rows[0].c_key;
            console.log(key);
            return key;
        }
    })
}

window.onload = function findcrt(params){
    connection.query(crt_sql, params, function(err, rows){
        if(err){
            console.log(err);
        }else{
            ccrt = rows[0].c_crt;
            console.log(ccrt);
            return ccrt;
        }
    })
}