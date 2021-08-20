const parse = require('parseurl');

module.exports = {
  get path() {
    return parse(this.req).pathname;
  }
}