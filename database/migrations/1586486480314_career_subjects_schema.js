'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CareerSubjectsSchema extends Schema {
  up () {
    this.create('career_subjects', (table) => {
      table.increments()
      table.integer('career_id').references().inTable('careers');
      table.integer('subject_id').references().inTable('subjects');
      table.timestamps()
    })
  }

  down () {
    this.drop('career_subjects')
  }
}

module.exports = CareerSubjectsSchema
