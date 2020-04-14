'use strict'

const Subject = use('App/Models/Subject');

class SubjectController {
    async home({ view }) {
        
        const subject = new Subject;

        return view.render('/index', { subject: subject.toJSON() })
    }

    async create({ }) {
        const careers = await Career.query().fetch();

        return view.render('/careers/:id/subjects',{ careers: careers.toJSON() })
    }
}

module.exports = SubjectController
