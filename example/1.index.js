const Koa = require('../lib/application.js');
const app = new Koa();

// 例子1.index.js 还未实现到ctx.body 所以暂时先用req,res 代替
app.use(async (req, res) => {
  res.end('hello wrold')
});

app.listen(3000)