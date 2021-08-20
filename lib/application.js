const EventEmitter  = require('events')
const context = require('./context')
const request = require('./request')
const response = require('./response')
const http = require('http')

class Application extends EventEmitter {
  constructor() {
    super()
    this.middleware = []
    this.context = Object.create(context)
    this.request = Object.create(request)
    this.response = Object.create(response)
  }

  use(callback) {
    this.middleware.push(callback)
  }

  createContext(req, res) {
    // 防止多个请求公用这三个参数this.context、this.request、this.response
    const context = Object.create(this.context)
    const request = Object.create(this.request)
    const response = Object.create(this.response)

    context.request = request // ctx.path 取值
    context.response = response
    context.request.req = context.req = req// ctx.req.path 和 ctx.request.req.path 取值
    context.response.res = context.res = res

    return context
  }

  // 中间件函数传入ctx和next参数（next就是下一个中间件函数）
  compose(ctx) {
    const dispatch = i => {
      if (i === this.middleware.length) return Promise.resolve()
      const fn = this.middleware[i]
      return Promise.resolve(fn(ctx, () => {
        dispatch(i+1)
      }))
    }
    return dispatch(0)
  }

  handleRequest(req, res) {
    const ctx = this.createContext(req, res)
    this.compose(ctx).then(() => {
      res.end(ctx.body)
    }).catch(e => {
      console.log('error', e)
    })
  }

  listen(arg) {
    http.createServer(this.handleRequest.bind(this)).listen(arg)
  }
}

module.exports = Application