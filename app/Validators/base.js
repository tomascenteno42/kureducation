'use strict'

class Base {
  get validateAll() {
    return true
  }

  async fails(error) {
    this.ctx.session.withErrors(error)
    .flashAll();

    return this.ctx.response.redirect('back');
  }
}

module.exports = Base
