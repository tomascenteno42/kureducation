'use strict'

const Career = use('App/Models/Career');
const Subject = use('App/Models/Subject');

class CareerController {

    async home({ view }) {

        const careers = await Career.query().fetch();
        return view.render('/personalize', { careers: careers.toJSON() })
    }

    async careers({ view, request }) {
        const page = request.get().page || 1;

        const careers = await Career.query().paginate(page, 7);
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

            await career.subjects().attach(request.body.subjects_id)
        } catch (error) {
            console.log(error)
        }
    }
    async destroy({ response, request }) {
        const career = request.career;

        await career.delete();        

        return response.redirect('back');   
    }

    async edit({  }) {
        const career = request.career;
        const subjects = await Subject().query().fetch();
        return view.render('/edit', { careers: career })
    }

    // async update({}) {
    //     const career = request.career;
    // }
}

module.exports = CareerController
