var gulp = require( 'gulp' );
var concat = require( 'gulp-concat' );
var addsrc = require( 'gulp-add-src' );

gulp.task( 'libraries', function() {
    return gulp.src( 'bower_components/jquery/dist/jquery.min.js' )
        .pipe( addsrc.append( 'bower_components/jquery-cookie/jquery.cookie.js' ) )
        .pipe( addsrc.append( 'bower_components/ember/ember.debug.js' ) )
        .pipe( addsrc.append( 'bower_components/ember-data/ember-data.min.js' ) )
        .pipe( addsrc.append( 'bower_components/ember-uploader/dist/ember-uploader.min.js' ) )
        .pipe( addsrc.append( 'bower_components/bootstrap/dist/js/bootstrap.min.js' ) )
        .pipe( addsrc.append( 'bower_components/trumbowyg/dist/trumbowyg.min.js' ) )
        .pipe( concat( 'libraries.js' ) )
        .pipe( gulp.dest( 'public/dist/js' ) );
} );