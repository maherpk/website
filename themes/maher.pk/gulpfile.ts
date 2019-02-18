import * as gulp from 'gulp';
import * as loadGulpPlugins from 'gulp-load-plugins';

const $ = loadGulpPlugins();

const buildStyles = () => {
  return gulp
    .src('./src/styles/**/*.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.size({ showFiles: true, showTotal: false }))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('./assets/styles'));
};

const optimizeImages = () => {
  return gulp
    .src('./src/images/**/*.{jpg,gif,png,svg}')
    .pipe(
      $.imagemin({
        interlaced: true,
        progressive: true,
        optimizationLevel: 5,
        svgoPlugins: [
          {
            removeViewBox: true,
          },
        ],
        verbose: true,
      }),
    )
    .pipe($.size({ showFiles: true, showTotal: false }))
    .pipe(gulp.dest('./static/images'));
};

const watch = () => {
  gulp.watch('./src/styles/**/*.scss', buildStyles);
  gulp.watch('./src/images/**/*.{jpg,gif,png,svg}', optimizeImages);
};

gulp.task('images', optimizeImages);
gulp.task('sass:build', buildStyles);
gulp.task('watch', watch);
gulp.task('default', watch);
