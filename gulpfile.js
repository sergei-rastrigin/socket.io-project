let gulp = require('gulp');
let nodemon = require('nodemon');
gulp.task('start', function() {
  let stream = nodemon({
    script: './bin/www',
    debug: true,
    ext: 'js jade',
    env: {
      'NODE_ENV': 'development'
    }
  });

  stream
    .on('restart', function() {
      console.log('restarted!')
    })
    .on('crash', function() {
      console.error('Application has crashed!\n')
      stream.emit('restart', 10) // restart the server in 10 seconds 
    })
});
