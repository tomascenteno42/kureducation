'use strict'

const Subject = use('App/Models/Subject');

class SubjectController {
    async home({ view }) {
        
        const subject = new Subject;

        return view.render('/index', { subject: subject.toJSON() })
    }

    async create({ view }) {

        return view.render('superadmin/subjects')
    }

    async store({ response, request, session }) {
       const subject = await Subject.create(request.only(['name']))

       session.flash({ message: `${subject.name} has been stored` });

       return response.redirect('/subjects');
    }
}

module.exports = SubjectController
