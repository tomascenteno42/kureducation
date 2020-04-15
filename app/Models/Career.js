'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Career extends Model {
    users () {
        return this
          .belongsToMany('App/Models/User')
          .pivotTable('user_careers');
    }
    subjects () {
        return this
          .belongsToMany('App/Models/Subject')
          .pivotTable('career_subjects');
    }
}

module.exports = Career
