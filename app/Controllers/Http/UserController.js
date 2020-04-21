'use strict'

const User = use('App/Models/User');
const Career = use('App/Models/Career');


class UserController {
    async signForm({ view }) {
        const careers = await Career.query().fetch();


        return view.render('/auth/sign',{ careers: careers.toJSON() })
    }

    async sign({ response, request, auth, view }) {
        
        const user = await User.create(request.only(['username', 'email', 'password']))
        const career = await Career.find(request.body.career_id)
        await user.careers().attach([career.id])

        await auth.login(user);

        return response.redirect('/')
    }

    async log({ response, request, auth, session }) {
        const { username, password } = request.all();
        console.log(username)

        try {
            await auth.attempt(username, password)
            return response.redirect('/')
        } catch(error) {
            session.flash({ loginError: 'Somethin went wrong with your credentials' })
            return response.redirect('/login');

        }

    }
}

module.exports = UserController
