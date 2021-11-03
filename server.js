import App from "./app.js"
import websockify from "koa-websocket"
import route from "koa-route";

const app = websockify(new App().app);
const PORT = 5002;

const _client = await new App().db

async function getMessagesCollection(){
    const client = await _client
    return client.db('test').collection('messages')
}


// WebSocket
app.ws.use(route.all('/ws',async (ctx)=>{

    // Render exited messages when user join the chatting room
    console.log('passed Render exited messages')
    const messagescollection = await getMessagesCollection()
    const chatCursor = await messagescollection.find({},{sort:{createdAt:1}})
    
    const chats = await chatCursor.toArray()
    ctx.websocket.send(JSON.stringify(
            {
                type : 'sync',
                payload : {chats}
            }
        )
    )

    //[Recive Message]
    ctx.websocket.on('message',async (data)=> {
        if(typeof data != 'string') return

        const chats= JSON.parse(data) 
        await messagescollection.insertOne({
            ...chats,
            createdAt : new Date()
        })

        const {nickname, message} = chats

        const {server} = app.ws
        if(!server) return
           
        server.clients.forEach(client=>{
            client.send(JSON.stringify({
                type : 'chat',
                payload : {nickname,message}
            }))
        })
      });
}));

// Server
app.listen(PORT,()=>{
    console.log(`Koa Server Connection Success http://localhost:${PORT}`)
});