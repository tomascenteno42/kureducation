'use strict'

const Base = require('./Base');

class LoginUser extends Base {
  get rules () {
    return {
      username: 'required',
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
