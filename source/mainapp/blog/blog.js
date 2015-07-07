App.BlogRoute = Ember.Route.extend(App.AuthentificationMixin, {

    toggle: false,

    model: function() {
        var posts = this.store.find('post');

        //var findPosts = this.store.find('post');
        posts.then(function () {
            var toggle = true;
            posts.forEach(function(post) {
                post.set('background', toggle);
                toggle = !toggle;
            });
        });

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

    isCreatingPost: false,
    isLoggedIn: false,

    needs: ['application'],

    application: Ember.computed.alias('controllers.application'),

    sortAscending: false,

    sortProperties: ['created_at'],

    background: 'bg-primary',

    isEditing: false,

    confirmDeletion: false,

    notificationMessages: Ember.Map.create(),

    notify: false,

    post_body: null,

    title: null,

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

            if(this.isCreatingPost){
                this.set('isCreatingPost', false);
            } else {
                this.set('isCreatingPost', true);
            }
        },

        savePost: function() {


            var store = this.store;
            //var author = App.Session.get('authAccountId');
            var type = 'message';
            var currentUserId = $.cookie('auth_account');
            var posts = store.createRecord('post', {
                title: this.title,
                post_body: this.post_body,
                type: type,
                author: author
            });



            //store.find('user', currentUserId).then(function(user) {
            //    posts.set('author', user.get('name'));
            //})

            if(posts.get('author') == null)
            {
                posts.set('author', 'west-coast');
            }






            posts.save().then( function() {
                this.send('pushNotification', 'New Post Created!', false);
                this.send('refreshModel');
            }.bind(this), function() {
                this.send('pushNotification', 'error', true);
            }.bind(this));

            this.send('newPost');

        },

        cancelPost: function() {

            this.get('loadModel').rollback();
            this.send('newPost');

        }

    }


});