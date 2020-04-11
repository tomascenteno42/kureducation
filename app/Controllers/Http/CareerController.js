'use strict'

const Career = use('App/Models/Career');

class CareerController {

    async home({ view }) {

        const careers = await Career.query().fetch();
        return view.render('/personalize', { careers: careers.toJSON() })
    }
}

module.exports = CareerController
