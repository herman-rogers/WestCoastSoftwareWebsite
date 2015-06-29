var gulp = require( 'gulp' );
var concat = require( 'gulp-concat' );
var addsrc = require( 'gulp-add-src' );
var browserify = require( 'browserify' );
var through2 = require( 'through2' );

gulp.task( 'embertests', function() {
    /**
     * Compile/Browserify Main Source
     * file webapp.js
     */
    return gulp.src( 'tests/main/**/*.js' )
        .pipe( addsrc.prepend( 'tests/initializers/**/*.js' ) )
        .pipe( through2.obj( function( file, enc, next ) {
            browserify( file.path )
                .bundle( function( err, res ) {
                    file.contents = res;
                    next( null, file );
                } );
        } ) )
        .pipe( concat( 'tests.js' ) )
        .pipe( gulp.dest( 'tests/compiled/' ) );
} );