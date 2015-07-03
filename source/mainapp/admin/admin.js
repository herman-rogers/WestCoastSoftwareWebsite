App.AdminRoute = Ember.Route.extend({

    //Check if user is logged in. If not, redirect to login page
    beforeModel: function() {
        if(!App.Session.get('authToken')) {
            this.transitionTo('loginpage');
        }
    },

    model: function() {
        var userId = App.Session.get('authAccountId');
        return this.store.find('user', userId);
    },

    //If logged in, redirect to 'profile page'
    redirect: function(model, transition) {
        var target = transition.targetName;
        if(target === '/' || target === 'admin.index') {
            this.transitionTo('profile');
        }
    },

    actions: {
        refreshModel: function() {
            this.refresh();
            window.scrollTo(0, 0);
        }
    }

});

App.AdminView = Ember.View.extend({
    templateName: 'admin'

});

App.AdminController = Ember.Controller.extend({


    $isEditing: false,
    //$isEditName: false,
    //$isEditEmail: false,

    needs: ['application'],
    application: Ember.computed.alias("controllers.application"),


    isAdmin: function() {
        //var permlevel = this.get('content.perm_level')==1;
        //console.log(permlevel);
        return this.get('content.perm_level')==1;
    }.property(),

    actions: {
        logout: function() {
            var postData = {};
            $.post('logout', postData).done(function(response) {
                App.Session.setProperties({
                    authToken: '',
                    authAccountId: ''
                });
                this.send('refreshModel');
                this.send('pushNotification',
                    'Successfully Logged Out', false);
            }.bind(this));
        },

        edit: function() {
            //Toggle between edit mode. If in edit mode, it will discard any changes and
            //exit 'edit' mode.
            if(this.$isEditing == false) {
                this.set('$isEditing', true);
            } else {
                this.set('$isEditing', false);
                //this.set('$isEditName', false);
                this.get('model').rollback();
            }

        },

        upload: function() {
            console.log('UPLOAD');
        },

        //editName: function() {
        //    if(this.$isEditName == false) {
        //        this.set('$isEditName', true);
        //    } else {
        //        this.set('$isEditName', false);
        //    }
        //},
        //
        ////Rollback/cancel any unsaved changes to the name field only
        //cancelNameChanges: function() {
        //    this.set('$isEditName', false);
        //    this.get('model').rollback('name');
        //},

        applyChanges: function() {
            //Check to see if the model has any unsaved changes. Returns true if so.
           if(this.get('model.isDirty')) {
                this.get('model').save().then(function() {
                    this.send('refreshModel');
                    window.scrollTo(0,0);
                    this.send('pushNotification',
                                'Changes Saved!', false);
                }.bind(this), function() {
                    //If failed
                    var errors = this.formValidation( response );
                    this.send( 'pushNotification',
                                errors, false);
                    this.get('model').rollback();
                }.bind(this));
           }
            this.send('edit');
        }

        //editEmail: function() {
        //    if(this.$isEditName == false) {
        //        this.set('$isEditEmail', true);
        //    } else {
        //        this.set('$isEditEmail', false);
        //    }
        //},
        //
        //cancelEmailChanges: function() {
        //    this.set('$isEditEmail', false);
        //
        //    if(this.$isEditName)
        //    {
        //        var model = this.get('model');
        //        var email = model.get('email');
        //        //email.rollback();
        //        model.rollbackAttributes();
        //    }
        //
        //    else {
        //        this.get('model').rollback('email');
        //    }
        //
        //}
    }

});