import Koa from "koa"
import Pug from "koa-pug"
import path from "path"
import mount from "koa-mount"
import serve from "koa-static"


class App {
    constructor(){
        this.app = new Koa()

        this.setViewEngin()
        this.setStatic()
        this.getRouter()
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

    getRouter(){
        this.app.use(async ctx => {
            await ctx.render('chat');
        });
    }
}

export default App