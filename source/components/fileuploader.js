App.FileUploaderComponent = EmberUploader.FileField.extend( {

    //target property for updating upload percentage
    targetProperty: null,

    //target property for updating upload percentage
    targetModel: null,

    //should be dynamically set to the root url + /api/upload
    url: '/WestCoastWebsite/public/api/upload',

    uploadedFile: null,

    uploadingPercent: 0,

    filesDidChange: ( function() {

        var uploadUrl = this.get( 'url' );
        var files = this.get( 'files' );
        var path = '/WestCoastWebsite/laravel/storage/';

        var uploader = EmberUploader.Uploader.create( {
            url: uploadUrl
        } );

        var extension = files[0].name.substr(files[0].name.lastIndexOf('.')+1);

        if(/(jpg|jpeg|png|gif)$/i.test(extension)){
            path = path.concat('images/');
        }
        else if(extension === 'mp4'){
            path = path.concat('videos/');
        }
        else{
            path = path.concat('downloads/');
        }

        if ( !Ember.isEmpty( files ) ) {

            this.set( 'uploadedFile', path + files[0].name );
            uploader.upload( files[0] );
        }

        this.monitorUploadProgress(uploader);
        this.createOnFinishEvent(uploader);
    } ).observes( 'files' ),

    monitorUploadProgress: function(uploader) {
        uploader.on('progress', function(e) {
            if(this.targetModel && this.targetProperty){
                this.sendAction('action', e.percent, this.targetModel, this.targetProperty);
            }
            else if(this.targetProperty)
                this.sendAction('action', e.percent, this.targetProperty);
            else
                this.sendAction('action', e.percent);
            return e.percent;
        }.bind(this));
    },

    createOnFinishEvent: function(uploader) {
        uploader.on('didUpload', function(e) {
            this.set('uploading', false);
        });
    }
} );
