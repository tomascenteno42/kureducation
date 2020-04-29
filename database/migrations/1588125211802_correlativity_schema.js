'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CorrelativitySchema extends Schema {
  up () {
    this.create('correlativities', (table) => {
      table.increments()
      table.integer('subject_id').unsigned().references('id').inTable('subjects').onDelete('CASCADE');
      table.integer('depends_on').unsigned().references('id').inTable('subjects').onDelete('CASCADE');
      table.timestamps()
    })
  }

  down () {
    this.drop('correlativities')
  }
}

module.exports = CorrelativitySchema
