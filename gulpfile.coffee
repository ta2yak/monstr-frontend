# gulpfile.coffee: build script for front assets
#
# gulp        - build assets
# gulp watch  - build assets continuously
# gulp server - start a server with assets and mocked APIs

sources =
  bower:  'bower.json'
  app:    'app/**/*'
  jsx:    'app/boot.jsx'
  less:   'app/**/*.less'
  static: 'public/**/*'

dist =
  deploy: '../monstr-backend/public'

libs =
  js: [
    'jquery/dist/jquery.min.js'
    'bootstrap/dist/js/bootstrap.min.js'
    'react/react.min.js'
    'bootstrap-material-design/dist/js/material.min.js'
    'bootstrap-material-design/dist/js/ripples.min.js'
  ]
  css: [
    'bootstrap/dist/css/bootstrap.min.css'
    'bootstrap-material-design/dist/css/material.min.css'
    'bootstrap-material-design/dist/css/material-fullpalette.min.css'
    'bootstrap-material-design/dist/css/ripples.min.css'
    'bootstrap-material-design/dist/css/roboto.min.css'
  ]
  static: [
    'bootstrap/dist/**/*'
    'bootstrap-material-design/dist/**/*'
  ]


bower       = require 'bower'
del         = require 'del'
gulp        = require 'gulp'
gutil       = require 'gulp-util'
concat      = require 'gulp-concat'
coffee      = require 'gulp-coffee'
less        = require 'gulp-less'
nodemon     = require 'gulp-nodemon'
plumber     = require 'gulp-plumber'
uglify      = require 'gulp-uglify'
streamify   = require 'gulp-streamify'
source      = require 'vinyl-source-stream'
browserify  = require 'browserify'
reactify    = require 'reactify'

gulp.task 'default', ['clean'], ->
  gulp.start 'compile:lib', 'compile:jsx', 'compile:less', 'compile:static'

gulp.task 'clean', (cb) ->
  del 'target/webapp/', cb

gulp.task 'watch', ->
  gulp.watch sources.bower,  ['compile:lib']
  gulp.watch sources.app,    ['compile:jsx', 'compile:less']
  gulp.watch sources.static, ['compile:static']


gulp.task 'compile:lib', ->
  bower.commands.install().on 'end', ->
    gulp.src libs.js.map (e) -> "bower_components/#{e}"
      .pipe concat 'lib.js'
      .pipe gulp.dest 'target/webapp/'
      .pipe gulp.dest dist.deploy
    gulp.src libs.css.map (e) -> "bower_components/#{e}"
      .pipe concat 'lib.css'
      .pipe gulp.dest 'target/webapp/'
      .pipe gulp.dest dist.deploy
    gulp.src libs.static.map (e) -> "bower_components/#{e}"
      .pipe gulp.dest 'target/webapp/'
      .pipe gulp.dest dist.deploy

gulp.task 'compile:jsx', ->
  browserify sources.jsx
    .transform reactify
    .bundle()
    .on 'error', (err) ->
      console.log gutil.colors.red "Oops! you have ERROR! \n" + err.message
      this.emit 'end'
    .pipe source "app.js"
    # .pipe streamify uglify()
    .pipe gulp.dest 'target/webapp/'
    .pipe gulp.dest dist.deploy

gulp.task 'compile:less', ->
  gulp.src sources.less
    .pipe plumber()
    .pipe less()
    .pipe concat 'app.css'
    .pipe gulp.dest 'target/webapp/'
    .pipe gulp.dest dist.deploy

gulp.task 'compile:static', ->
  gulp.src sources.static
    .pipe gulp.dest 'target/webapp/'
    .pipe gulp.dest dist.deploy

gulp.task 'server', ['compile:apimock'], ->
  gulp.start 'watch', 'watch:apimock'
  nodemon
    script: 'target/apimock.js'
    watch: ['target/apimock.js', 'target/webapp/']
    env:
      port: 8888
      webapp: "#{__dirname}/target/webapp/"

gulp.task 'watch:apimock', ->
  gulp.watch 'apimock.coffee', ['compile:apimock']

gulp.task 'compile:apimock', ->
  gulp.src 'apimock.coffee'
    .pipe plumber()
    .pipe coffee()
    .pipe gulp.dest 'target/'
