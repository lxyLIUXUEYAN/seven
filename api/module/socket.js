// 推送功能 服务器主动发送消息 客户端进行处理
// 实现 ：调用一个api接口  -> 所有打开的网页弹框

const WebSocket = require("ws");
const ws = new WebSocket.Server({port : 8000},()=>{
    console.log("socket 服务器开启");
});

// 开启socket服务器
let clients = [];
ws.on("connection",(client)=>{
    // client 连接上的客户端对象
   clients .push(client);
   client.send("欢迎光临");
   // 接收客户端发送的消息
    client.on("message",(msg)=>{
        console.log(msg);
        if(msg === "push"){

        }
    });
    client.on("close",()=>{
        console.log(client.name + "离开了");
    })
});

// 主动发送消息
function pushMsg(msg) {
    for(var i = 0; i < clients.length;i++){
        clients[i].send(msg);
    }
}

module.exports = {pushMsg};