// 例子2.index.js
const Koa = require('../lib/application.js')
const app = new Koa()

app.use(async(ctx) => {
  console.log(ctx.req.path, 1)
  console.log(ctx.request.req.path, 2)
  console.log(ctx.request.path, 3)  // 有值
  console.log(ctx.path, 4) // 有值
  // ctx.body = 'hello world'
  // ctx.body下面再实现，这里暂时先用ctx.res.end
  // ctx.res.end('hello world')
  ctx.body = 'hello world'
})

app.listen(3000)