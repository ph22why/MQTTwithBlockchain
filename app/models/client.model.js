const sql = require("./db.js");

// 생성자 
const Client = function (client) {
    this.uid = client.uid;
    this.country = client.country;
    this.state = client.state;
    this.local = client.local;
    this.company = client.company;
    this.section = client.section;
    this.common = client.common;
    this.requestDate = client.requestDate;
    this.issueDate = client.issueDate;
    this.ckey = client.ckey;
    this.ccrt = client.ccrt;
    this.crt = client.crt;
};

// client 튜플 추가 
Client.create = (newClient, result) => {
    sql.query("INSERT INTO clientinfo SET ?", newClient, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log(
            "Created client: ",
            {
                uid: res.insertUid,
                country: res.insertCountry,
                state: res.insertState,
                local: res.insertLocal,
                company: res.insertCompany,
                section: res.insertSection,
                common: res.insertCommon,
                requestDate: res.insertRequestDate,
                issueDate: res.insertIssueDate,
                ckey: res.insertckey,
                ccrt: res.insertccrt,
                crt: res.insertcrt
            }
        );
        result(null,
            {
                uid: res.insertUid,
                country: res.insertCountry,
                state: res.insertState,
                local: res.insertLocal,
                company: res.insertCompany,
                section: res.insertSection,
                common: res.insertCommon,
                requestDate: res.insertRequestDate,
                issueDate: res.insertIssueDate,
                ckey: res.insertckey,
                ccrt: res.insertccrt,
                crt: res.insertcrt
            }
        );
    });
};

// client uid로 조회
Client.findcaByUID = (clientUID, result) => {
    sql.query('SELECT ca_crt FROM clientinfo WHERE uid = ?', clientUID, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("ca.crt found: ", res[0]);
            result(null, res[0]);
            return;
        }
    })
}
Client.findkeyByUID = (clientUID, result) => {
    sql.query('SELECT c_key FROM clientinfo WHERE uid = ?', clientUID, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("c.key found: ", res[0]);
            result(null, res[0]);
            return;
        }
    })
}
Client.findcrtByUID = (clientUID, result) => {
    sql.query('SELECT c_crt FROM clientinfo WHERE uid = ?', clientUID, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("c.crt found: ", res[0]);
            result(null, res[0]);
            return;
        }
    })
}

// client uid로 조회
Client.findByUID = (clientUID, result) => {
    sql.query('SELECT * FROM clientinfo WHERE uid = ?', clientUID, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found client: ", res[0]);
            result(null, res[0]);
            return;
        }

        // 결과가 없을 시 
        result({ kind: "not_found" }, null);
    });
};

// client 전체 조회
Client.getAll = result => {
    sql.query('SELECT * FROM clientinfo', (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("client: ", res);
        result(null, res);
    });
};

// client uid로 수정
Client.updateByUID = (uid, client, result) => {
    sql.query('UPDATE clientinfo SET country = ?, state = ?, local = ?, company = ?, section = ?, common = ?, requestDate = ?, issueDate = ?, csr = ? WHERE uid = ?',
        [client.country, client.state, client.local, client.company, client.section, client.common, client.requestDate, client.issueDate, client.csr, uid], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.affectedRows == 0) {
                // id 결과가 없을 시 
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("update client: ",
                {
                    uid: uid,
                    country: country,
                    state: state,
                    local: local,
                    company: company,
                    section: section,
                    common: common,
                    requestDate: requestDate,
                    issueDate: issueDate,
                    csr: csr
                }
            );
            result(null,
                {
                    uid: uid,
                    country: country,
                    state: state,
                    local: local,
                    company: company,
                    section: section,
                    common: common,
                    requestDate: requestDate,
                    issueDate: issueDate,
                    csr: csr
                }
            );
        });
};

// client id로 삭제
Client.remove = (uid, result) => {
    sql.query('DELETE FROM clientinfo WHERE uid = ?', uid, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.affectedRows == 0) {
            // id 결과가 없을 시 
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted customer with uid: ", uid);
        result(null, res);
    });
};

// client 전체 삭제
Client.removeAll = result => {
    sql.query('DELETE FROM clientinfo', (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.affectedRows == 0) {
            // id 결과가 없을 시 
            result({ kind: "not_found" }, null);
            return;
        }

        console.log('deleted ${res.affectedRows} clients');
        result(null, res);
    });
};

module.exports = Client;