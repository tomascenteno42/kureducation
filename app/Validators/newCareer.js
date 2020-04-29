'use strict'

const Base = require('./Base');

class newCareer extends Base {
  get rules () {
    return {
      name: 'unique|require'
    }
  }
  get messages () {
    return {
      unique: 'Hey homie, that {{ field }} already exists',
      require: 'Hey homie complete'
    }
  }
}

module.exports = newCareer
