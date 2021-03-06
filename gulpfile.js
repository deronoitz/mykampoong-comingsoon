const gulp = require('gulp');
const minifyCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const minify = require('gulp-minify');
const { src, dest, parallel } = gulp;

gulp.task('css', function() {
    return gulp
        .src('./dev/stylesheet/**/*.css', { sourcemaps: true })
        .pipe(sourcemaps.init())
        .pipe(concat('app.min.css'))
        .pipe(minifyCSS())
        .pipe(sourcemaps.write())
        .pipe(dest('./app/assets/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});


gulp.task('js', function() {
    return gulp
        .src('./dev/js/*.js', { sourcemaps: false })
        // .pipe(sourcemaps.init())
        // .pipe(sourcemaps.write())
        .pipe(concat('app.min.js'))
        .pipe(minify())
        .pipe(dest('./app/assets/js'), { sourcemaps: false })
});

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: './app'
        },
    })
});

gulp.task('watch_css', function() {
    return gulp.watch('./dev/stylesheet/**/*.css', gulp.series('css', function(done) {
        browserSync.reload();
        done();
    }));
})
gulp.task('watch_js', function() {
    return gulp.watch('./dev/js/*.js', gulp.series('js', function(done) {
        browserSync.reload();
        done();
    }));
})
gulp.task('watch_html', function() {
    return gulp.watch('./app/*.html', function(done) {
        browserSync.reload();
        done();
    })
})
gulp.task('watch', gulp.parallel('css', 'js', 'browserSync', 'watch_js', 'watch_css', 'watch_html'));

gulp.task('build', gulp.series('css', 'js'));