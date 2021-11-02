import App from "./app.js"
import websockify from "koa-websocket"
import route from "koa-route";

const app = new App().app;
const server = websockify(app);
const PORT = 5002;

// WebSocket
server.ws.use(route.all('/ws',ctx=>{

    ctx.websocket.send('Client Connection')

    ctx.websocket.on('message',(data)=> {
        if(typeof data != 'string') return
        const {nickname, message} = JSON.parse(data)        
      });

}));

// Server
server.listen(PORT,()=>{
    console.log(`Koa Server Connection Success http://localhost:${PORT}`)
});