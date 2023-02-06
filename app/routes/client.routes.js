module.exports = app =>{
    const clients = require("../controller/client.controller.js");

    // 튜플 생성
    app.post("/clients", clients.create);

    // 전체 조회 
    app.get("/clients", clients.findAll);

    // id로 조회
    app.get("/clients/:clientUid", clients.findOne);

    // id로 수정
    app.put("/clients/:customerUid", clients.update);

    // id로 삭제
    app.delete("/clients/:customerUid", clients.delete);

    // 전체 삭제
    app.delete("/clients", clients.deleteAll);

};