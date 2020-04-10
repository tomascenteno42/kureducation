'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserCareerSchema extends Schema {
  up () {
    this.create('user_careers', (table) => {
      table.increments();
      table.integer('user_id').references().inTable('users');
      table.integer('career_id').references().inTable('careers');
      table.timestamps()
    })
  }

  down () {
    this.drop('user_careers')
  }
}

module.exports = UserCareerSchema
