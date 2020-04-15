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

    async store({ request, response, session }) {
        const career = await Career.create(request.only(['name']))

        session.flash({ message: `${career.name} has been created` })
        return response.redirect('/careers');
    }

    async joinForm({ view }) {
        const careers = await Career.query().fetch();
        const subjects = await Subject.query().fetch();
        return view.render('superadmin/career_subject', { careers: careers.toJSON(), subjects: subjects.toJSON() })
    }

    async join({ request }) {
        try {
            const career = await Career.find(request.body.career_id)
            const subject = await Subject.find(request.body.subject_id)
            
            await career.subjects().attach([subject.id])
        } catch (error) {
            console.log(error)
        }
       
  

    }
}

module.exports = CareerController
