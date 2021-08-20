// 例子2.index.js
const Koa = require('../lib/application.js')
const app = new Koa()

app.use((ctx, next) => {
  console.log(1)
  next();
  console.log(2)
  ctx.body = 'hello1';
});

app.use((ctx, next) => {
  console.log(3);
  next();
  console.log(4);
  ctx.body = 'hello2';
});

app.use((ctx, next) => {
  console.log(5);
  next();
  console.log(6);
  ctx.body = 'hello3';
});

app.listen(3000)