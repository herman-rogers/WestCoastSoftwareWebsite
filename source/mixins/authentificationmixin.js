App.AuthentificationMixin = Ember.Mixin.create( {

    // Authenticate user before loading route
    beforeModel: function( ) {
        var loggedIn = this.controllerFor( 'AuthentificationMixin' ).get( 'loggedIn' );

        if ( loggedIn ) {
            this.controllerFor('blog').set('isLoggedIn', true);
            //return Ember.RSVP.reject( 'Unauthorized Access' );
        }
    }

} );

App.AuthentificationMixinController = Ember.Controller.extend( {

    needs: ['index'],

    loggedIn: Ember.computed.alias( 'controllers.index.loggedIn' ),

    moveFromPageIfLoggedOut: function() {
        if ( !this.get( 'loggedIn' ) ) {
            this.transitionToRoute( 'index' );
        }
    }.observes( 'loggedIn' ).on( 'init' )

} );