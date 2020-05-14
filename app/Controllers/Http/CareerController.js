'use strict'

const Career = use('App/Models/Career');
const Subject = use('App/Models/Subject');
const User = use('App/Models/User');
const Database = use('Database')
class CareerController {

    async home({ view, auth }) {
        const userCareers = await auth.user.careers().fetch();

        return view.render('/personalize', { careers: userCareers.toJSON() })

    }

    async careers({ view, request }) {
        const page = request.get().page || 1;

        const careers = await Career.query().paginate(page, 6);
        return view.render('superadmin/careers', { careers: careers.toJSON() });
    }

    async store({ request, response, session }) {
        try {
            const career = await Career.create(request.only(['name']))    
            console.log(career)
        } catch (error) {
            console.log(error)
        }

        
        return response.redirect('back');
    }
    async destroy({ response, request }) {
        const career = request.career;

        await career.delete();        

        return response.redirect('back');   
    }

    async edit({ view, params }) {

        const career = await Career.query().where('id', params.id).with('subjects').first()
        
        const subjects = await Subject.query().whereNotIn('id', career.toJSON().subjects.map(subject => {
            return subject.id
        })).fetch();
        console.log(subjects.toJSON())
        
        return view.render('superadmin/careers_edit', { career: career.toJSON(), subjects: subjects.toJSON()})
    }

    async update({ params, request, response }) {
        const career = await Career.find(params.id)
        
        career.name = request.all().name;

        await career.save();
        
        return response.redirect('back')


    }

    async detach({ params, response }) {
        const { id, subject_id } = params;

        const career = await Career.find(id);

        await career.subjects().detach(subject_id);

        return response.redirect('back')
    }

    async attach({ params, response }) {
        const { id, subject_id } = params;

        const career = await Career.find(id);

        await career.subjects().attach(subject_id);

        return response.redirect('back')
    }

    async personalize({ request, view }) {
        const career = request.career;

        const subjects = await career.subjects().with('correlativity').fetch();
        const sortedSubjects = subjects.toJSON().sort((a, b) => b.correlativity.length - a.correlativity.length)
        console.log(sortedSubjects)

        return view.render('/personalize_career', { subjects: sortedSubjects })

    }
}

module.exports = CareerController
