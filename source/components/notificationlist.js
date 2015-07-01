///**
// * Created by josh on 30/06/2015.
// */
//
// App.NotificationListComponent = Ember.Component.extend({
//     notifications: null,
//
//     lastLength: 0,
//
//     application: Ember.computed.alias("controllers.application"),
//     currentNotifications: Ember.computed.alias("controllers.application.currentNotifications"),
//
//
//     didInsertElement: function() {
//         if(this.notifications.get('length') != 0){
//             this.notifications.forEach(function(notification){
//                 Ember.run.later( this, function() {
//                     if (this.notifications.indexOf(notification) >= 0) {
//                         this.send('closeAlert', notification );
//                     }
//                 }, 3000 );
//             }, this)
//         }
//     },
//
//     timeout: function() {
//         var lastLength = this.get('lastLength');
//         var notifications = this.get('notifications');
//
//         //Check notification was added not destroyed
//         if (notifications.length >= lastLength) {
//             var index = notifications.length - 1;
//
//             if(index>= 0) {
//                 var notification = notifications [ index ];
//                 Ember.run.later( this, function () {
//                     if (notifications.indexOf ( notification ) >= 0) {
//                         this.send ( 'closeAlert', notification );
//                     }
//                 }, 3000 );
//             }
//         }
//
//         //update last length
//         this.set('lastLength', notifications.length);
//     }.observes('notifications.length'),
//
//     actions: {
//         closeAlert: function( notification ) {
//             this.sendAction('closeNotification', notification);
//         }
//     }
// });

/**
 * Created by wat on 10/06/2015.
 */
App.NotificationListComponent = Ember.Component.extend( {
    notifications: [],

    lastLength: 0,

    didInsertElement: function(){
        if(this.notifications != null){
            this.notifications.forEach(function(notification){
                Ember.run.later( this, function () {
                    if ( this.notifications.indexOf( notification ) >= 4 ) {
                        this.send( 'closeAlert', notification );
                    }
                }, 3000 );
            }, this)
        }
    },

    ////DO NOT REFERENCE IN HANDLEBARS
    timeout: function() {
        var lastLength = this.get( 'lastLength' );
        var notifications = this.get( 'notifications' );

        //check it was an added notification, not a destroyed one
        if ( notifications.length >= lastLength ) {
            var index = notifications.length - 1;

            if ( index >= 0 ) {
                var notification = notifications[ index ];
                Ember.run.later( this, function () {
                    //If more than 4 notifications are displayed, close the oldest/first one
                    if ( notifications.indexOf( notification ) >= 4 ) {
                        this.send( 'closeAlert', notifications[0] );
                    }
                    //Checks every 3 seconds
                }, 3000 );
            }
        }
        //update last length
        this.set('lastLength', notifications.length);
        //Monitor the length of the array, if it changes execute the function
    }.observes('notifications.length'),

    actions: {
        closeAlert: function( notification ){
            this.sendAction('closeNotification', notification);
        }
    }

});