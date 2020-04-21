'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CareerSubjectsSchema extends Schema {
  up () {
    this.create('career_subjects', (table) => {
      table.increments()
      table.integer('career_id').unsigned().references('id').inTable('careers').onDelete('CASCADE');
      table.integer('subject_id').unsigned().references('id').inTable('subjects').onDelete('CASCADE');
      table.timestamps()
    })
  }

  down () {
    this.drop('career_subjects')
  }
}

module.exports = CareerSubjectsSchema
