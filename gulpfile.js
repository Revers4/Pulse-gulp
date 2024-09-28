const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync')
const rename = require('gulp-rename')
const autoprefixer = require('gulp-autoprefixer')
let cleanCss = require('gulp-clean-css')

gulp.task('server', function() {
  browserSync.init({
      server: {
          baseDir: "src"
      }
  });
});


gulp.task('styles', function(){
  return gulp.src("src/scss/styles.+(scss|sass)")
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename({
      prefix:"",
      suffix:".min"
    }))
    .pipe(autoprefixer({
      overrideBrowserslist: [
          'last 2 version',
          '> 1%'
      ]
  }))
    .pipe(cleanCss({compatibility:"ie8"}))
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.stream())
})

gulp.task('watch', function(){
  gulp.watch('src/scss/*.+(scss|sass)',gulp.parallel("styles"))
  gulp.watch('src/*.html').on("change",browserSync.reload)
})

gulp.task('default', gulp.parallel('watch','server',"styles"))