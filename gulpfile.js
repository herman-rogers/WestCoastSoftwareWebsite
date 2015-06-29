var gulp = require( 'gulp' );

var requireDir = require( 'require-dir' );
requireDir( './gulp/tasks', { recurse: true } );

gulp.task( 'default', ['libraries', 'scripts', 'styles', 'embertests'] );