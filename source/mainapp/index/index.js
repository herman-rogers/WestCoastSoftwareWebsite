App.IndexRoute = Ember.Route.extend({


});

App.IndexView = Ember.View.extend({
    templateName: 'index'
});

App.IndexController = Ember.Controller.extend({


    loggedIn: function() {
        return App.Session.get( 'authToken' );
    }.property( 'App.Session.authToken' )


});