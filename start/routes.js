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
const Route = use('Route');

Route.on('/').render('/index')
Route.get('/personalize', 'CareerController.home');


Route.post('/signup', 'UserController.sign').validator('registerUser');
Route.get('/signup', 'UserController.signForm');



Route.on('/login').render('auth/login');
Route.post('/login', 'UserController.log').validator('logUser');

Route.get('/logout', async({ auth, response }) => {
    await auth.logout();

    return response.redirect('/')
});


// SUPERADMIN
Route.group(() => {
    Route.get('/', 'CareerController.careers');
    Route.post('/', 'CareerController.store');
    Route.get('/:id/subjects', 'CareerController.joinForm');

    Route.get('/:id/edit', 'CareerController.edit');
    Route.post('/:id/edit', 'CareerController.detach');

    Route.delete('/:id', 'CareerController.destroy').middleware('findCareer');

}).prefix('superadmin/careers').middleware('superadmin');

Route.group(() => {
    Route.get('/', 'SubjectController.create');
    Route.post('/', 'SubjectController.store'); 
}).prefix('/subjects').middleware('superadmin')

Route.group(() => {
    Route.get('/', 'CareerController.joinForm');
    Route.post('/', 'CareerController.join'); 
}).prefix('/join').middleware('superadmin');