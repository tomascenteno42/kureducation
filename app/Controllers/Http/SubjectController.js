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

    async destroy({request, response}) {
        const subject = request.subject;

        await subject.delete();        

        return response.redirect('back'); 
    }
    
    async edit({ view, params }) {

        const subject = await Subject.query().where('id', params.id).with('correlativity').first();
        console.log(subject.toJSON().correlativity.map(subject =>{
            return subject.id
        }))
        const subjects = await Subject.query().whereNotIn('id', subject.toJSON().correlativity.map(subject => {
            return subject.id
        })).whereNot('id', subject.id).fetch();
        

        return view.render('superadmin/subjects_edit', { subjects: subjects.toJSON(), subject: subject.toJSON()})
    }

    async update({ params, request, response }) {
        const subject = await Subject.find(params.id)
        
        subject.name = request.all().name;

        await subject.save();
        
        return response.redirect('back')
    }
    async attach({ params, response }) {
        try {
            const { subject_id, depends_on } = params;
            
            const subject = await Subject.find(subject_id);
            
            await subject.correlativity().attach(depends_on);
        } catch (error) {
            console.log(error)
        }
        

        return response.redirect('back')
    }
    async detach({ params, response }) {
        try {
            const { subject_id, depends_on } = params;
            
            const subject = await Subject.find(subject_id);
            
            await subject.correlativity().detach(depends_on);

        } catch (error) {
            console.log(error)
        }
        

        return response.redirect('back')
    }

    
}

module.exports = SubjectController
