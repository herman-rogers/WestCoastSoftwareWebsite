/**
 * Created by wat on 01/06/2015.
 */
App = Ember.Application.create({
    rootElement: '#webapp',

    currentPath: ''
});

//application route for handling global actions such as notifications
App.ApplicationRoute = Ember.Route.extend({

    actions: {
        pushNotification: function(message, error) {
            var controller = this.get('controller');
            controller.pushNotification(message, error);
        },

        closeNotification: function(notification) {
            var controller = this.get('controller');
            controller.closeNotification(notification);
        }
    }
});

//application controller for global actions and variables such as notifications
//to access this controller, put the following in the controller requiring access:
// needs: ['application']
App.ApplicationController = Ember.Controller.extend({

    currentNotifications: [],
    randomInt: 0,

    notification: Ember.Object.extend({
        title: null,
        message: null,
        error: false
    }),

    //Don't Call Directly, Use Route.Send to activate
    pushNotification: function(message, error) {
        var currentNotifications = this.get('currentNotifications');
        var notification = new this.notification;
        var test = error ? 'Failure' : 'Success';

        notification.setProperties({
            title: test,
            message: message + this.randomInt,
            error: error
        });

        //Remove old message
        if(currentNotifications.length >= 4) {
            this.send('closeNotification', currentNotifications[0]);
        }

        currentNotifications.pushObject(notification);
        this.randomInt = currentNotifications.lastIndexOf(notification);
    },

    closeNotification: function(notification) {
        var currentNotifications = this.get('currentNotifications');
        var index = currentNotifications.indexOf(notification);
        //remove notification
        currentNotifications.removeAt(index);
        //Track the indices of the notifications. Returns the index of the last notification
        this.randomInt = currentNotifications.lastIndexOf(notification);
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

//Created on initialization of the app;
Ember.Application.initializer({
    name: 'session',

    initialize: function(container, application) {
        //new ember object named session
        App.Session = Ember.Object.extend({
            init: function() {
                this._super();
                this.set('authToken', $.cookie('auth_token'));
                this.set('authAccountId', $.cookie('auth_account'));
            },

            authTokenChanged: function() {
                $.cookie('auth_token', this.get('authToken'));
            },

            authAccountIdChanged: function() {
                var authAccountId = this.get('authAccountId');
                $.cookie('auth_account', authAccountId);
                if(!Ember.isEmpty(authAccountId)) {
                    var store = App.__container__.lookup('store:main');
                    this.set('authAccount', store.find('user', authAccountId));
                }
            }.observes('authAccountId')

        }).create();
    }
});

Ember.$.ajaxPrefilter( function( option, originalOption, jqXHR ) {
    if( !jqXHR.crossDomain ) {
        jqXHR.setRequestHeader( 'X-AUTHENTIFICATION-TOKEN',
            App.Session.get( 'authToken' ) );
    }
})