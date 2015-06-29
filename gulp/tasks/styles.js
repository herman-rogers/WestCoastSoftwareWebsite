var gulp = require( 'gulp' );
var concat = require( 'gulp-concat' );
var addsrc = require('gulp-add-src');

gulp.task( 'styles', function() {
    return gulp.src( 'styles/**/*.css' )
        //.pipe( addsrc.append( 'bower_components/trumbowyg/dist/ui/trumbowyg.min.css' ) )
        .pipe( concat( 'appstyles.css' ) )
        .pipe( gulp.dest( 'public/dist/styles' ) );
} );