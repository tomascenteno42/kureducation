'use strict'

const Subject = use('App/Models/Subject');

class SubjectController {
    async home({ view }) {
        
        const subject = new Subject;

        return view.render('/index', { subject: subject.toJSON() })
    }

}

module.exports = SubjectController
