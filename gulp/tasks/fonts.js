export const fonts = () => {
   return app.gulp.src(`${app.path.src}/fonts/**/*.{eot,ttf,woff,woff2}`).pipe(app.gulp.dest(`${app.path.build}/fonts`));
};
