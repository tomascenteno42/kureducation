'use strict'

const Career = use('App/Models/Career');

class CareerController {

    async home({ view }) {

        const career = new Career;


        return view.render('/index', { career: career.toJSON() })
    }
}

module.exports = CareerController
