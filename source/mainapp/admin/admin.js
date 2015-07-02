App.AdminRoute = Ember.Route.extend({

    //Check if user is logged in. If not, redirect to login page
    beforeModel: function() {
        if(!App.Session.get('authToken')) {
            this.transitionTo('loginpage');
        }
    },

    model: function() {
        var userId = App.Session.get('authAccountId');
        return this.store.find('user', userId);
    },

    //If logged in, redirect to 'profile page'
    redirect: function(model, transition) {
        var target = transition.targetName;
        if(target === '/' || target === 'admin.index') {
            this.transitionTo('profile');
        }
    }
});

App.AdminView = Ember.View.extend({
    templateName: 'admin'

});

App.AdminController = Ember.Controller.extend({

    needs:['application'],
    application: Ember.computed.alias("controllers.application"),

    isLoggedIn: function(){}

})