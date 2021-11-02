import App from "./app.js"
import websockify from "koa-websocket"
import route from "koa-route";

const app = websockify(new App().app);
const PORT = 5002;

// WebSocket
app.ws.use(route.all('/ws',ctx=>{

    ctx.websocket.send('Client Connection')

    //[Recive Message]
    ctx.websocket.on('message',(data)=> {
        if(typeof data != 'string') return

        const {nickname, message} = JSON.parse(data) 

        const {server} = app.ws
        if(!server) return
        
        server.clients.forEach(client=>{
            client.send(JSON.stringify({nickname,message}))
        })

      });
}));

// Server
app.listen(PORT,()=>{
    console.log(`Koa Server Connection Success http://localhost:${PORT}`)
});