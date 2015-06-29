var bootstrap = require('bootstrap');

App = Ember.Application.create({
    rootElement: '#webapp'
});

App.ApplicationController = Ember.Controller.extend({

    currentNotifications: [],
    notification: Ember.Object.extend({
        title: null,
        message: null,
        error: false,
    }),

    pushNotification: function(message, error) {
        var currentNotifications = this.get('currentNotifications');
        var notification = new this.notification;
        var test = error ? 'Failure' : success;

        notification.setProperties({
            title: test,
            message: message,
            error: error,
        });

        if(currentNotifications.length >= 4) {
            this.send('closeNotification', currentNotifications[0]);
        }
        currentNotifications.pushObject(notification);
    },

    closeNotification: function(notification) {
        var currentNotifications = this.get('currentNotifications');
        var index = currentNotifications.indexOf(notification);
        //Remove Notification
        currentNotifications.removeAt(index);
    },

    updateCurrentPath: function() {
        App.set('currentPath', this.get('currentPath'));
    }.observes('currentPath')
});

App.ApplicationAdapter = DS.RESTAdapter.extend({
    namespace: 'WestCoastWebsite/public/api'
});

App.ApplicationStore = DS.Store.extend({
    revision: 1,
    adapter: 'App.ApplicationAdapter'
});
