var gulp = require( 'gulp' ),
    livingcss = require( 'gulp-livingcss' ),
    sass = require( 'gulp-sass' ),
    fs = require( 'fs-extra' ),
    path = require( 'path' ),
    runSequence = require( 'run-sequence' ),
    clean = require( 'gulp-dest-clean' ),
    sublime = require( './lib/gulp-sublime.js' ),
    intellij = require( './lib/gulp-intellij.js' );

// Output variables
var sublimeDest = 'snippets/sublime',
    intellijDest = 'snippets/intellij'

// define custom tag
var optsObj = {
    preprocess: function ( context, template, Handlebars ) {
        context.globalStylesheets.push( 'cedar.css' );
        context.title = "Cedar Snippet Docs";

        return livingcss.utils.readFileGlobs( './template/partials/*.hbs', function ( data, file ) {
            // make the name of the partial the name of the file
            var partialName = path.basename( file, path.extname( file ) );
            Handlebars.registerPartial( partialName, data );
        } );
    },
    tags: {
        modifier: function () {
            var section = this.sections[ this.tag.description ];

            if ( section ) {
                section.modifiers = section.modifiers || [];
                section.modifiers.push( {
                    name: this.tag.name,
                    value: this.tag.type
                } )
            }
        }
    },
    template: './template/snipTemplate.hbs'
};

// Make the JSON from comments -- waiting to replace this is updated
gulp.task( 'livingjson', function () {
    var jsonObj = optsObj;
    jsonObj.preprocess = function ( context, template, Handlebars ) {
        fs.outputFile( './dist/json/elements.json', JSON.stringify( context.sections, null, '  ' ), function ( err ) {
            if ( err ) {
                console.error( err );
            }
        } );
        return false;
    };

    return gulp.src( 'src/css/main.css' )
        .pipe( livingcss( '', jsonObj ) )
} );

gulp.task( 'clean-sublime', function () {
    return gulp.src( sublimeDest )
        .pipe( clean( sublimeDest ) );
} )

gulp.task( 'clean-intellij', function () {
    return gulp.src( intellijDest )
        .pipe( clean( intellijDest ) );
} )

// Create Snippets tasks
gulp.task( 'sublime-snips', function () {
    return gulp.src( './dist/json/elements.json' )
        .pipe( sublime() )
        .pipe( gulp.dest( sublimeDest ) )
} );

gulp.task( 'intellij-snips', function () {
    return gulp.src( './dist/json/elements.json' )
        .pipe( intellij() )
        .pipe( gulp.dest( intellijDest ) )
} );


// general stuff
gulp.task( 'livingcss', function () {
    return gulp.src( 'src/css/main.css' )
        .pipe( livingcss( '', optsObj ) )
        .pipe( gulp.dest( 'dist' ) )
} );

gulp.task( 'sass', function () {
    return gulp.src( './src/scss/**/*.scss' )
        .pipe( sass().on( 'error', sass.logError ) )
        .pipe( gulp.dest( 'src/css/' ) )
} );

// Parsing SCSS comments and outputting JSON
gulp.task( 'default', function ( cb ) {
    runSequence(
        'sass',
        'livingcss',
        'livingjson',
        cb )
} );

// Generate all snippet types
gulp.task( 'snippets', function ( cb ) {
    runSequence(
        'default',
        'clean-sublime',
        'sublime-snips',
        'clean-intellij',
        'intellij-snips',
        cb )
} );

// Generate sublime snippets
gulp.task( 'sublime', function ( cb ) {
    runSequence(
        'default',
        'clean-sublime',
        'sublime-snips',
        cb )
} );

// Generate intellij snippets
gulp.task( 'intellij', function ( cb ) {
    runSequence(
        'default',
        'clean-intellij',
        'intellij-snips',
        cb )
} );
