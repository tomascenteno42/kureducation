'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Subject = use('App/Models/Subject');

class FindSubject {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, params }, next) {
    
    const subject = await subject.find(params.id);

    request.subject = subject;

    await next()
  }
}

module.exports = FindSubject
