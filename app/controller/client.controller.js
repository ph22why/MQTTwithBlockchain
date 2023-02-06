const Client = require("../models/client.model.js");

// 새 객체 생성
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    };

    const client = new Client(
        {
            uid: req.body.uid,
            country: req.body.country,
            state: req.body.state,
            local: req.body.local,
            company: req.body.company,
            section: req.body.section,
            common: req.body.common,
            requestDate: req.body.requestDate,
            issueDate: req.body.issueDate,
            csr: req.body.csr
        }
    );

    // 데이터베이스에 저장
    Client.create(client, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occured while creating the Client."
            });
        };
    })
};

// 전체 조회 
exports.findAll = (req, res) => {
    Client.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving clients."
            });
        else res.send(data);
    });
};

// uid로 조회
exports.findOne = (req, res) => {
    Client.findById(req.params.clientUid, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Client with id ${req.params.clientUid}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Client with id " + req.params.clientUid
                });
            }
        } else res.send(data);
    });
};

// uid로 갱신
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Client.updateById(
        req.params.clientUid,
        new Customer(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Client with id ${req.params.clientUid}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Client with id " + req.params.clientUid
                    });
                }
            } else res.send(data);
        }
    );
};

// uid로 삭제
exports.delete = (req, res) => {
    Client.remove(req.params.clientUid, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Client with uid ${req.params.clientUid}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Client with uid " + req.params.clientUid
                });
            }
        } else res.send({ message: `Client was deleted successfully!` });
    });
};

// 전체 삭제
exports.deleteAll = (req, res) => {
    Client.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all clients."
            });
        else res.send({ message: `All Clients were deleted successfully!` });
    });
};