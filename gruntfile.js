'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    // grunt-contrib-copy
    // copy untouched 3rd-party files needed by the app to the correct directory
    copy: {
      foundation: {
        files: [
          {
            expand: true,
            cwd: 'bower_components/webcomponentsjs/',
            src: 'webcomponents.min.js',
            dest: 'app/js/3rd-party/'
          }
        ]
      }
    },
    // grunt-contrib-connect
    // serve the app
    connect: {
      server: {
        options: {
          port: 9000,
          base: '',
          // inject js into the served html-page so the livereload featues
          // of grunt-contrib-watch can be used (without any extra browser plugin)
          livereload: true
        }
      }
    },
    // grunt-contrib-jshint
    // do some linting.
    jshint: {
      files: ['app/js/**/*.js', '!app/js/3rd-party/**'],
      options: {
        globalstrict: true,
        browser: true,
        devel: true, // for console.log
        globals: {
          // the other globals are defined in the .js files
        }
      }
    },
    vulcanize: {
      files: {
         src: 'bower_components/google-map/google-map.html',
         dest: 'app/js/3rd-party/vulcanized-google-map.html'
      },
      options: {
        stripComments: true,
        stripCss: true
      }
    },
    // grunt-contrib-watch
    // watch files for changes and run tasks based on the changed files
    watch: {
      css_files: {
        files: ['app/css/*.css'],
        options: {
          livereload: true
        }
      },
      html_files: {
        files: ['app/**/*.html'],
        options: {
          livereload: true
        }
      },
      js_files: {
        files: ['app/js/**/*.js'],
        options: {
          livereload: true
        },
        tasks: ['jshint']
      },
      bower_files: {
        files: ['bower_components/**/*'],
        options: {
          livereload: true
        },
        tasks: ['copy']
      },
      grunt: {
        files: ['gruntfile.js']
      }
    }
  });
  
  // load and register the grunt tasks
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-vulcanize');
  grunt.registerTask('serve', ['default', 'copy', 'connect', 'watch']);
  grunt.registerTask('default', ['copy', 'jshint','vulcanize']);
};