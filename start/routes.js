'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const User = use('App/Models/User');
(async () => {
    try{
        const user = await User.query().where({email: 'kurepa@superadmin.com'}).fetch()

        if(!user) {
            try {
                const usuario = await User.create({
                    username: process.env.SUPERADMIN_USERNAME,
                    email: process.env.SUPERADMIN_EMAIL,
                    password: process.env.SUPERADMIN_PASSWORD,
                    superadmin: true
    
                })
                console.log(usuario)    
            } catch (error) {
                console.log(error);
            }
            
        }    
    }catch(error) {
        console.log(error)
    }
    
})()



Route.get('/', 'SubjectController.home');


Route.on('/signup').render('/auth/sign');
Route.post('/signup', 'UserController.sign').validator('registerUser');


Route.on('/login').render('auth/login');
Route.post('/login', 'UserController.log').validator('logUser');

Route.get('/logout', async({ auth, response }) => {
    await auth.logout();

    return response.redirect('/')
});

Route.on('/careers').render('careers')



