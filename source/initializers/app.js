//var bootstrap = require('bootstrap');
//
//App = Ember.Application.create({
//    rootElement: '#webapp',
//
//    currentPath: ''
//});
//
//
////Application route for handling global action such as Notifications
//App.ApplicationRoute = Ember.Route.extend({
//
//    actions: {
//        pushNotification: function ( message, error ) {
//            //console.log('PUSH');
//            var controller = this.get('controller');
//            controller.pushNotification( message, error );
//        },
//
//        closeNotification: function ( notification ) {
//            var controller = this.get( 'controller' );
//            controller.closeNotification( notification );
//        }
//    }
//});
//
//
//App.ApplicationController = Ember.Controller.extend({
//
//    currentNotifications: [],
//    notification: Ember.Object.extend({
//        title: null,
//        message: null,
//        error: false
//    }),
//
//    pushNotification: function(message, error) {
//
//        var currentNotifications = this.get('currentNotifications');
//        console.log(currentNotifications.length);
//        var notification = new this.notification;
//        var test = error ? 'Failure' : 'Success';
//
//        notification.setProperties({
//            title: test,
//            message: message,
//            error: error
//        });
//
//        //console.log(notification);
//        if(currentNotifications.length >= 4) {
//            this.send('closeNotification', currentNotifications[0]);
//        }
//        currentNotifications.pushObject(notification);
//        //console.log(notification);
//    },
//
//    closeNotification: function(notification) {
//        var currentNotifications = this.get('currentNotifications');
//        var index = currentNotifications.indexOf(notification);
//        //Remove Notification
//        currentNotifications.removeAt(index);
//    },
//
//    updateCurrentPath: function() {
//        App.set('currentPath', this.get('currentPath'));
//    }.observes('currentPath')
//});
//
//App.ApplicationAdapter = DS.RESTAdapter.extend({
//    namespace: 'WestCoastWebsite/public/api'
//});
//
//App.ApplicationStore = DS.Store.extend({
//    revision: 1,
//    adapter: 'App.ApplicationAdapter'
//});

/**
 * Created by wat on 01/06/2015.
 */
App = Ember.Application.create( {
    rootElement: '#webapp',

    currentPath: ''
} );

//application route for handling global actions such as notifications
App.ApplicationRoute = Ember.Route.extend({

    actions: {
        pushNotification: function ( message, error ) {
            var controller = this.get('controller');
            controller.pushNotification( message, error );
        },

        closeNotification: function(notification){
            var controller = this.get('controller');
            controller.closeNotification( notification );
        }
    }
});

//application controller for global actions and variables such as notifications
//to access this controller, put the following in the controller requiring access:
// needs: ['application']
App.ApplicationController = Ember.Controller.extend({

    currentNotifications: [],

    notification: Ember.Object.extend( {
        title: null,
        message: null,
        error: false
    } ),

    //Don't Call Directly, Use Route.Send to activate
    pushNotification: function( message, error ) {
        var currentNotifications = this.get( 'currentNotifications' );
        var notification = new this.notification;
        var test = error ? 'Failure' : 'Success';

        notification.setProperties( {
            title: test,
            message: message,
            error: error
        } );

        //Remove old message
        if(currentNotifications.length >= 4) {
            this.send('closeNotification', currentNotifications[0]);
        }

        currentNotifications.pushObject( notification );
    },

    closeNotification: function( notification ){
        var currentNotifications = this.get( 'currentNotifications' );
        var index = currentNotifications.indexOf(notification);
        //remove notification
        currentNotifications.removeAt(index);
    },

    updateCurrentPath: function() {
        App.set('currentPath', this.get('currentPath'));
    }.observes('currentPath')
});

App.ApplicationAdapter = DS.RESTAdapter.extend( {
    namespace: 'WestCoastWebsite/public/api'
} );

App.ApplicationStore = DS.Store.extend( {
    revision: 1,
    adapter: 'App.ApplicationAdapter'
} );