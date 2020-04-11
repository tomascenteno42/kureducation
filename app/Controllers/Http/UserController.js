'use strict'

const User = use('App/Models/User');
const Career = use('App/Models/Career');


class UserController {

    async sign({ response, request, auth, view }) {
        
        const user = await User.create(request.only(['username', 'email', 'password']))
        console.log(user)
        const career = await Career.find(request.body.career_id)
        console.log(career)
        await user.careers().attach([career.id])

        await auth.login(user);

        return response.redirect('/')
    }

    async signForm({ view }) {
        const careers = await Career.query().fetch();


        return view.render('/auth/sign',{ careers: careers.toJSON() })
    }


    async log({ response, request, auth, session }) {
        const { email, password } = request.all();

        try {
            await auth.attempt(email, password)
            return response.redirect('/')
        } catch(error) {
            session.flash({ loginError: 'Somethin went wrong with your credentials' })
            return response.redirect('/login');

        }

    }
}

module.exports = UserController
