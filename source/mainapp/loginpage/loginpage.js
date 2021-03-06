App.LoginpageRoute = Ember.Route.extend({

    model: function() {
        return this.store.find('user');
    }

});

App.LoginpageView = Ember.View.extend({
    templateName: 'loginpage'
});

App.LoginpageController = Ember.Controller.extend({



    email: '',
    password: '',

    needs: ['application'],
    application: Ember.computed.alias("controllers.application"),
    errors: [],

    formValidation: function( response ) {
        var jsonResponse = response.responseJSON.error;
        var errors = Ember.keys( jsonResponse).map( function( key ) {
            var jsonResponseValue = jsonResponse[key];
            if( Array.isArray( jsonResponseValue ) ) {
                jsonResponseValue = jsonResponseValue.join( '');
            }
            return {field: key, value: jsonResponseValue};
        }.bind( this ) );
    },

    actions: {

        gotoRegister: function()
        {
            this.transitionTo('registerpage');
        },

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
            $.post( 'login', postData).done( function (response) {
                var sessionData = (response.session || {});
                App.Session.setProperties( {
                    authToken:      sessionData.auth_token,
                    authAccountId:  sessionData.account_id,
                    isLoggedIn:     true
                });
                var attemptedTransition = App.Session.get( 'attemptedTransition' );
                if ( attemptedTransition ) {
                    attemptedTransition.retry();
                    App.Session.set( 'attemptedTransition', null);
                }
                else {
                    this.transitionToRoute( 'admin' );
                }
                this.send( 'pushNotification',
                            'You have Successfully Logged In', false);
            }.bind( this )).fail( function( response ) {
                //Failed to login, display error
                App.Session.set('isLoggedIn', false);

                var error = this.formValidation( response );
                var errors = this.get('errors');
                errors = error;

                this.send( 'pushNotification',
                            errors, true );
            }.bind( this ) );
        }
    }
});