'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Subject extends Model {
    careers () {
        return this
            .belongsToMany('App/Models/Career')
            .pivotTable('career_subjects');
    }
}

module.exports = Subject
