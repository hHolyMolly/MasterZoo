import htmlmin from "gulp-htmlmin";

import notify from "gulp-notify";
import plumber from "gulp-plumber";

import csso from "gulp-csso";

import gulpJsmin from "gulp-jsmin";

export const minifyHTML = () => {
   return app.gulp
      .src(`${app.path.build}/**/*.html`)
      .pipe(
         plumber({
            errorHandler: notify.onError((error) => ({
               title: "HTML",
               message: error.message,
            })),
         })
      )
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(app.gulp.dest(`${app.path.build}`));
};

export const minifyCSS = () => {
   return app.gulp
      .src(`${app.path.build}/css/**/*.css`)
      .pipe(
         plumber({
            errorHandler: notify.onError((error) => ({
               title: "CSS",
               message: error.message,
            })),
         })
      )
      .pipe(csso())
      .pipe(app.gulp.dest(`${app.path.build}/css`));
};

export const minifyJS = () => {
   return app.gulp
      .src(`${app.path.build}/js/**/*.js`)
      .pipe(
         plumber({
            errorHandler: notify.onError((error) => ({
               title: "JS",
               message: error.message,
            })),
         })
      )
      .pipe(gulpJsmin())
      .pipe(app.gulp.dest(`${app.path.build}/js`));
};
