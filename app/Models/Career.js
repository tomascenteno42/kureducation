'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Career extends Model {
    users () {
        return this
          .belongsToMany('App/Models/User')
          .pivotTable();
    }
    subjects () {
        return this
          .belongsToMany('App/Models/Subject')
          .pivotTable();
    }
}

module.exports = Career
