App.BlogRoute = Ember.Route.extend({

    model: function() {
        var posts = this.store.find('post');
        //posts.then(function() {
        //    var toggle = true;
        //    posts.forEach(function(post) {
        //        post.set('background', toggle);
        //        toggle = !toggle;
        //    });
        //});
        return posts;
    },


    actions: {
        refreshModel: function() {
            this.refresh();
            window.scrollTo(0, 0);
        }
    }

});

App.BlogView = Ember.View.extend({
    templateName: 'blog'
});

App.BlogController = Ember.Controller.extend({

    $isCreatingPost: false,
    isLoggedIn: false,

    needs: ['application'],

    application: Ember.computed.alias('controllers.application'),

    checkIsLoggedIn: function() {
        if(!App.Session.get('authToken'))
        {
            this.isLoggedIn = false;
        } else {
            this.isLoggedIn = true;
        }

        return this.isLoggedIn;
    }.property('App.Session.authToken'),

    actions: {
        newPost: function() {

            if(this.$isCreatingPost){
                this.set('$isCreatingPost', false);
            } else {
                this.set('$isCreatingPost', true);
            }
        },

        savePost: function() {

            var model = this.get('model');

            model.save().then( function() {
                this.send('pushNotification', 'New Post Created!', false);
                this.send('refreshModel');
            }.bind(this), function() {
                this.send('pushNotification', 'error', true);
            }.bind(this));
        },

        cancelPost: function() {

        }

    }


});