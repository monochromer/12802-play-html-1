const stream = require('stream');
const gulp = require('gulp');
const htmlnano = require('gulp-htmlnano');
const rename = require('gulp-rename');
const inlineCSS = require('gulp-inline-css');

function pages() {
  return stream.pipeline(
    gulp.src(['*/*.html', '!**/*.min.html']),
    inlineCSS({
      preserveMediaQueries: true
    }),
    htmlnano({
      collapseWhitespace: 'conservative',
      removeComments: 'safe',
      removeEmptyAttributes: false,
      removeAttributeQuotes: false,
      removeRedundantAttributes: false,
      removeOptionalTags: false,
      minifyCss: false
    }),
    rename(path => {
      path.basename += '.min';
    }),
    gulp.dest('.'),
    (error) => {
      if (error) {
        console.error(error);
      }
    }
  )
}

pages.description = 'Обработка HTML для писем';

module.exports = {
  pages
}
