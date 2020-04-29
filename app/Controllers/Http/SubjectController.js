'use strict'

const Subject = use('App/Models/Subject');

class SubjectController {

    async subjects({ view, request }) {
        const page = request.get().page || 1;

        const subjects = await Subject.query().paginate(page, 6);

        return view.render('superadmin/subjects', { subjects: subjects.toJSON() })
    }

    async store({ response, request, session }) {
       const subject = await Subject.create(request.only(['name']))

       session.flash({ message: `${subject.name} has been stored` });

       return response.redirect('back');
    }
}

module.exports = SubjectController
