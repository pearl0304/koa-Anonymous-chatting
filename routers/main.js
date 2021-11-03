import Router from "koa-router";
const route = new Router()

route.get('/',async ctx=>{
    await ctx.render('chat')
})

export default route