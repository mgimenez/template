# template-gulp
Template for init any project, includes Gulp tasks basics to frontend developping

Tasks included

## gulp dist
Generates distribution files to develop
  Runs 
  - **clean**: Cleans all files into distribution directory
  - **sass**: Generates CSS files from SCSS files from source directory to distribution directory
    - **autoprefixer**: Adds CSS vendor prefixes for browsers > 0.1% according with [BrowserList](http://browserl.ist/) 
  - **hintJs**: JSHint Validate Javascript files from source directory and report on the terminal window
  - **copyJs**: Copies Javascirpt files from source directory to distribution directory
  - **copyVendor**: Copies vendor files from source directory to distribution directory
  - **pug**: Generates HTML from PUG files
  - **pugTemplates**: Generates HTML from PUGT files (mixins)
  - **imagemin**: Minify images source directory to distribution directory

## gulp dev
Generates distribution files to develop, watches files and run local webserver
  Runs 
  - **clean**: Cleans all files into distribution directory
  - **sass**: Generates CSS files from SCSS files from source directory to distribution directory
    - **autoprefixer**: Adds CSS vendor prefixes for browsers > 0.1% according with [BrowserList](http://browserl.ist/) 
  - **hintJs**: JSHint Validate Javascript files from source directory and report on the terminal window
  - **copyJs**: Copies Javascirpt files from source directory to distribution directory
  - **copyVendor**: Copies vendor files from source directory to distribution directory
  - **pug**: Generates HTML from PUG files
  - **pugTemplates**: Generates HTML from PUGT files (mixins)
  - **imagemin**: Minify images source directory to distribution directory
  - **watch**: Watches files and runs specific tasks
    - Watches SCSS files from source directory and runs SCSS task
    - Watches HTML files from source directory and runs copyHtml task
    - Watches Javascript files from source directory and runs copyJs task
    - Watches PUG/TPUG files from source directory and runs pug-watch task
  - **pug-watch**: Runs pug and pugTemplates tasks then browserSync.reload();
  - **browser-sync**: Creates a local server form dist directory and keep updated the browser to any change 
    - default protocol: http
    - default hostname: localhost
    - default port: 3000

## gulp build
Generates distribution files to production environment
  Runs 
  - **clean**: Cleans all files into distribution directory
  - **sass**: Generates CSS files from SCSS files from source directory to distribution directory
    - **autoprefixer**: Adds CSS vendor prefixes for browsers > 0.1% according with [BrowserList](http://browserl.ist/) 
  - **hintJs**: JSHint Validate Javascript files from source directory and report on the terminal window
  - **copyVendor**: Copies vendor files from source directory to distribution directory
  - **pug**: Generates HTML from PUG files
  - **pugTemplates**: Generates HTML from PUGT files (mixins)
  - **concatJs**: Concatenate all Javascript files on the source directory to a unique 'app.js' file into the distribution directory
  - **uglifyJs**: Uglify from dist to dist, runs after **concatJs** task, so that use the same source and distribution directories.
  - **imagemin**: Minify images source directory to distribution directory
  - **mergeScript**: Process HTML, merge script tags
