'use strict'

const Career = use('App/Models/Career');
const Subject = use('App/Models/Subject');

class CareerController {

    async home({ view }) {

        const careers = await Career.query().fetch();
        return view.render('/personalize', { careers: careers.toJSON() })
    }

    async create({ view }) {
        return view.render('superadmin/careers')
    }

    async store({ request, response }) {
        const career = await Career.create(request.only(['name']))
        return response.redirect('/careers');
    }
}

module.exports = CareerController
