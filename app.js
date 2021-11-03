import Koa from "koa"
import KoaBody from 'koa-body';
import KoaCors from 'koa-cors';
import KoaRange from 'koa-range';
import KoaLogger from 'koa-logger';
import Pug from "koa-pug"
import path from "path"
import mount from "koa-mount"
import serve from "koa-static"
import mongoClient from "./models/config.js"
import router from "./routers/main.js"

class App {
    constructor(){
        this.app = new Koa()

        this.setDatabase()
        this.setViewEngin()
        this.setStatic()
        this.setMiddleware()
        this.getRouter()
    }

    async setDatabase(){
        const _client = mongoClient.connect() 
        const client = await _client
        return client.db('chat').collection('messages')
    }

    setViewEngin(){
        const __dirname = path.resolve()
        new Pug({
            viewPath:(__dirname, './views'),
            app : this.app
        })
    }

    setStatic(){
        this.app.use(mount('/public',serve('src/public')))
    }

    setMiddleware(){
        this.app.use(KoaRange)
        this.app.use(KoaLogger());
        this.app.use(KoaCors());
        this.app.use(KoaBody({ multipart: true }));

    }

    getRouter(){
        this.app.use(router.routes())
    }
}

export default App