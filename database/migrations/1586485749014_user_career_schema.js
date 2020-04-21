'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserCareerSchema extends Schema {
  up () {
    this.create('user_careers', (table) => {
      table.increments();
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.integer('career_id').unsigned().references('id').inTable('careers').onDelete('CASCADE');
      table.timestamps()
    })
  }

  down () {
    this.drop('user_careers')
  }
}

module.exports = UserCareerSchema
