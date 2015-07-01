//App.LoginpageRoute = Ember.Route.extend({
//
//    model: function() {
//
//    }
//
//});
//
//App.LoginpageView = Ember.View.extend({
//    templateName: 'loginpage'
//
//});
//
//App.LoginpageController = Ember.Controller.extend({
//
//    needs: ['application'],
//    email: '',
//    password: '',
//
//    application: Ember.computed.alias("controllers.application"),
//    currentNotifications: Ember.computed.alias("controllers.application.currentNotifications"),
//    errors: [],
//
//    formValidation: function(response) {
//        var jsonResponse = response.responseJSON.error;
//        var errors = Ember.keys(jsonResponse).map(function(key) {
//            var jsonResponseValue = jsonResponse[key];
//            if(Array.isArray(jsonResponseValue)) {
//                jsonResponseValue = jsonResponseValue.join('');
//            }
//            return {field: key, value: jsonResponseValue};
//        }.bind(this));
//    },
//
//    actions: {
//        login: function() {
//            console.log(this.application);
//            console.log(this.currentNotifications);
//            //var currentNotifications = this.get('application').get('currentNotifications')
//            console.log(this.get('application').get('currentNotifications'));
//            this.send('pushNotification', 'DONE', false);
//            var data = this.getProperties('email', 'password');
//            var postData = {
//                session: {
//                    email: data.email,
//                    password: data.password
//                }
//            };
//
//            return this.currentNotifications;
//
//            ////Post Credentials to backend for authentication check
//            //$.post('login', postData).done(function(response) {
//            //    var sessionData = (response.session || {});
//            //    App.Session.setProperties({
//            //        authToken: sessionData.auth_token,
//            //        authAccountId: sessionData.account_id
//            //    });
//            //    var attemptedTransition = App.Session.get('attemptedTransition');
//            //    if(attemptedTransition) {
//            //        attemptedTransition.retry();
//            //        App.Session.set('attemptedTransition', null);
//            //    }
//            //    else {
//            //        this.transitionToRoute('index');
//            //    }
//            //    this.send('pushNotification', 'You have successfully Logged In', false);
//            //}.bind(this)).fail(function(response) {
//            //    var error = this.formValidation(response);
//            //    var errors = this.get('errors');
//            //    errors = error;
//            //
//            //    this.send('pushNotification', errors, true);
//            //}.bind(this));
//        }
//    }
//});

App.LoginpageRoute = Ember.Route.extend({});

App.LoginpageView = Ember.View.extend({
    templateName: 'loginpage'
});

App.LoginpageController = Ember.Controller.extend({



    email: '',
    password: '',

    needs: ['application'],
    application: Ember.computed.alias("controllers.application"),
    errors: [],

    //formValidation: function( response ) {
    //    var jsonResponse = response.responseJSON.error;
    //    var errors = Ember.keys( jsonResponse).map( function( key ) {
    //        var jsonResponseValue = jsonResponse[key];
    //        if( array.isArray( jsonResponseValue ) ) {
    //            jsonResponseValue = jsonResponseValue.join( '');
    //        }
    //        return {field: key, value: jsonResponseValue};
    //    }.bind( this ) );
    //},

    actions: {
        login: function() {

            //Get user login details/input
            var data = this.getProperties( 'email', 'password');
            var postData = {
                session: {
                    email: data.email,
                    password: data.password
                }
            };

            //Post credentials to backend for authentication
            $.post( 'user', postData).done( function (response) {
                var sessionData = (response.session || {});
                App.Session.setProperties( {
                    authToken:      sessionData.auth_token,
                    authAccountId:  sessionData.account_id
                });
                var attemptedTransition = App.Session.get( 'attemptedTransition' );
                if ( attemptedTransition ) {
                    attemptedTransition.retry();
                    App.Session.set( 'attemptedTransition', null);
                }
                else {
                    this.transitionToRoute( 'index' );
                }
                this.send( 'pushNotification',
                            'You have Successfully Logged In', false);
            }.bind( this )).fail( function( response ) {
                //Failed to login, display error
                //var error = this.formValidation( response );
                var errors = this.get('errors');
                //errors;

                this.send( 'pushNotification',
                            errors, true );
            }.bind( this ) );
        }
    }
});