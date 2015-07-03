/**
 * Created by josh on 02/07/2015.
 */

App.RegisterpageRoute = Ember.Route.extend({

    model: function() {
        return this.store.createRecord('user');
    }

});


App.RegisterpageView = Ember.View.extend({
    templateName: 'registerpage'
});

App.RegisterpageController = Ember.Controller.extend({

    registering: false,

    needs: ['application'],
    application: Ember.computed.alias("controllers.application"),
    errors: [],

    actions: {
        register: function() {

            var model = this.get('model');

            model.save().then( function () {
                this.transitionToRoute('loginpage');
                this.send('pushNotification', 'Successfully Registered', false);
                //this.send('refreshModel');
            }.bind(this), function(response) {
                this.send( 'pushNotification',
                    'FAILED', true );
            }.bind(this));


        }
    }

});