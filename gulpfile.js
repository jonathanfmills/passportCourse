var gulp = require('gulp');
	nodemon = require('gulp-nodemon');


gulp.task('default', function(){
	nodemon({
		script:'./bin/www', 
		ext: 'js',
		env: {
			PORT: 3000,
			DEBUG: 'my-application'
		},
		ignore: ['./node_modules/**']
	})
	.on('restart', function(){
		console.log('Restarting');
	})
});