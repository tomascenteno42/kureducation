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

Route.get('/', 'CareerController.home');

Route.on('/signup').render('/auth/sign');
Route.post('/signup', 'UserController.sign').validator('registerUser');


Route.on('/login').render('auth/login');
Route.post('/login', 'UserController.log').validator('logUser');

Route.get('/logout', async({ auth, response }) => {
    await auth.logout();

    return response.redirect('/')
});


