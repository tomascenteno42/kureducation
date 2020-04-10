'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SubjectsSchema extends Schema {
  up () {
    this.create('subjects', (table) => {
      table.increments();
      table.string('name').notNullable().unique();
      table.timestamps();
    })
  }

  down () {
    this.drop('subjects')
  }
}

module.exports = SubjectsSchema
