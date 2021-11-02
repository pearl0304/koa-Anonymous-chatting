import App from "./app.js"
const server = new App().app;
const PORT = 5002




server.listen(PORT,()=>{
    console.log(`Koa Server Connection Success http://localhost:${PORT}`)
})