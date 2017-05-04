
const gulp = require("gulp");
const del = require("del");


gulp.task("fresh-project", function(cb) {
    del([
        './module/**/*.css',
        './_test-output/*',
        './bundle/*',
        './coverage/*',
        './demo/app/*.js',
        './demo/app/*.js.map'
    ]).then(function () { cb(); });
});


gulp.task("bundle:prepare", function(cb) {

    del([
        './bundle/*'
    ]).then(function () { cb(); });
});


gulp.task('bundle:finalize', function() {

    return gulp.src([
        './module/**/*.html',
        './module/**/*.css'
    ], { base: "./module" })
        .pipe(gulp.dest('./bundle'));
});


gulp.task('bump:patch', function(){

    const bump = require("gulp-bump");

    gulp.src('./package.json')
        .pipe(bump({type:'patch'}))
        .pipe(gulp.dest('./'));
});
