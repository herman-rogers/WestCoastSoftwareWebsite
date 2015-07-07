/**
 * Created by josh on 30/06/2015.
 */

App.MainHeaderComponent = Ember.Component.extend( {

    loggedIn: function() {
        return App.Session.get( 'authToken' );
    }.property( 'App.Session.authToken' )

});