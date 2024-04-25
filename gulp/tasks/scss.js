import dartSass from "gulp-dart-sass";

import notify from "gulp-notify";
import plumber from "gulp-plumber";

export const scss = () => {
   return app.gulp
      .src(`${app.path.src}/scss/style.scss`)
      .pipe(
         plumber({
            errorHandler: notify.onError((error) => ({
               title: "CSS",
               message: error.message,
            })),
         })
      )
      .pipe(dartSass().on("error", dartSass.logError))
      .pipe(app.gulp.dest(`${app.path.build}/css`))
      .pipe(app.plugins.browserSync.stream());
};
