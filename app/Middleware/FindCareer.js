'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Career = use('App/Models/Career');

class FindCareer {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, params }, next) {
    
    const career = await Career.find(params.id);

    request.career = career;

    await next()
  }
}

module.exports = FindCareer
