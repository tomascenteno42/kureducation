'use strict'

const Career = use('App/Models/Career');
const Subject = use('App/Models/Subject');

class CareerController {

    async home({ view }) {

        const careers = await Career.query().fetch();
        return view.render('/personalize', { careers: careers.toJSON() })
    }

    async careers({ view }) {
        const careers = await Career.query().fetch();

        return view.render('superadmin/careers', { careers: careers.toJSON() });
    }

    async store({ request, response, session }) {
        const career = await Career.create(request.only(['name']))

        session.flash({ message: `${career.name} has been created` })
        
        return response.redirect(`/careers/${career.id}/subjects`);
    }

    async joinForm({ view }) {
        const careers = await Career.query().fetch();
        const subjects = await Subject.query().fetch();
        return view.render('superadmin/career_subject', { careers: careers.toJSON(), subjects: subjects.toJSON() })
    }

    async join({ request }) {
        try {
            const career = await Career.find(request.body.career_id)
            console.log(request.body)
            await career.subjects().attach(request.body.subjects_id)
        } catch (error) {
            console.log(error)
        }
    }
    async delete({ request, response }) {
        const career = request.career;
        console.log(request.body);
        
        return response.redirect('back');    }
}

module.exports = CareerController
