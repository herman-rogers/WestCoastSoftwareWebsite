App.IndexRoute = Ember.Route.extend({

    model: function() {

    }
});

App.IndexView = Ember.View.extend({
    templateName: 'index'
});

App.IndexController = Ember.Controller.extend({

    needs: ['application'],
    currentNotifications: Ember.computed.alias("controllers.application.currentNotifications"),

    actions: {
        login: function() {
            console.log(this.currentNotifications);
            this.send( 'pushNotification', 'Message Sent', false );
        }
    }
});