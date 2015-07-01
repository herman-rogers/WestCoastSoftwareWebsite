App.Router.map(function() {

    this.resource('login');
    this.resource('logout');

    //Page Routes
    this.resource('index', {path: '/'});
    this.resource('blog');
    this.resource('admin');
    this.resource('loginpage');

    this.resource('users', {path: '/users/:user_id'});
});