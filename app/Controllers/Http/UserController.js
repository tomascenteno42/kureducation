'use strict'

const User = use('App/Models/User');

class UserController {

    async sign({ response, request, auth }) {
        const user = await User.create(request.only(['username', 'email', 'password']))

        await auth.login(user);

        return response.redirect('/')
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
