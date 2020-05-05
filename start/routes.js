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
    Route.post('/:id/edit', 'CareerController.update').as("update");

    Route.post('/:id/subjects/:subject_id', 'CareerController.attach' ).as('attach');
    Route.delete('/:id/subjects/:subject_id', 'CareerController.detach' ).as('detach');

    Route.delete('/:id', 'CareerController.destroy').middleware('findCareer');

}).prefix('superadmin/careers').middleware('superadmin');

Route.group(() => {
    Route.get('/', 'SubjectController.subjects');
    Route.post('/', 'SubjectController.store'); 
    Route.post('/:id', 'SubjectController.update');

    Route.delete('/:id', 'SubjectController.destroy').middleware('findSubject');

    Route.get('/:id/edit', 'SubjectController.edit');
    Route.post('/:id/edit', 'SubjectController.update');

    Route.post('/:subject_id/correlativity/:depends_on', 'SubjectController.attach' );
    Route.delete('/:subject_id/correlativity/:depends_on', 'SubjectController.detach' );


}).prefix('superadmin/subjects').middleware('superadmin')

Route.get('/personalize/:id', 'CareerController.personalize').middleware('findCareer');



