'use strict'

const Base = require('./base');

class registerUser extends Base {
  get rules () {
    return {
      username: 'required|unique:users' ,
      email: 'required|unique:users',
      password: 'required'
    }
  }
  get messages () {
    return {
      required: 'Hey homie, complete the {{ field }}',
      unique: 'Hey homie, that {{ field }} already exists'
    }
  }
}

module.exports = registerUser
