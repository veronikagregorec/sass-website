const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const prefix = require("gulp-autoprefixer");
const minify = require("gulp-clean-css");
const imagemin = require("gulp-imagemin");
const imagewebp = require("gulp-webp");

// compile, prefix, and min scss
function compilescss() {
  return src("src/scss/*.scss")
    .pipe(sass())
    .pipe(prefix("last 2 versions"))
    .pipe(minify())
    .pipe(dest("dist/css"));
}

// optimize and move images
function optimizeimg() {
  return src("src/images/*.{jpg,png}")
    .pipe(
      imagemin([
        imagemin.mozjpeg({ quality: 80, progressive: true }),
        imagemin.optipng({ optimizationLevel: 2 }),
      ])
    )
    .pipe(dest("dist/images"));
}

// optimize and move images
function webpImage() {
  return src("dist/images/*.{jpg,png}")
    .pipe(imagewebp())
    .pipe(dest("dist/images"));
}

function watchTask() {
  watch("src/scss/**/*.scss", compilescss);
  watch("src/images/*", optimizeimg);
  watch("dist/images/*.{jpg,png}", webpImage);
}

exports.default = series(compilescss, optimizeimg, webpImage, watchTask);
