'use strict'

const Base = require('./Base');

class LoginUser extends Base {
  get rules () {
    return {
      email: 'required|email',
      password: 'required'
    }
  }
  get messages () {
    return {
      'required': 'Hey homie, complete the {{ field }}'
    }
  }
}

module.exports = LoginUser
