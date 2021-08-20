const context = {}


// 通过 __defineGetter__ 代理，访问 context 上的属性时候，代理到对应的target上(request/response)
// context的作用就是将request、response对象挂载到ctx的上面
function defineGetter(target, key) {
  context.__defineGetter__(key, function() {
    return this[target][key]
  })
}

function defineSetter(target, key) {
  context.__defineSetter__(key, function(val) {
    this[target][key] = val
  })
}

defineGetter('request', 'path')
defineGetter('response', 'body')
defineSetter('response', 'body')

module.exports = context
