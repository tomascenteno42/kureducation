'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CareersSchema extends Schema {
  up () {
    this.create('careers', (table) => {
      table.increments();
      table.string('name').unique();
      table.timestamps();
    })
  }

  down () {
    this.drop('careers');
  }
}

module.exports = CareersSchema
