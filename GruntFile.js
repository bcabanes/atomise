'use strict';

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        /** GENERATE JSON PATTERNS LIBRARY **/
        dir2strings: {
          options: {
            exclude: '**/*.md'
          },
          data: {
            root: 'public/patternlab/sources/_patterns',
            dest: 'public/patternlab/sources/patterns.json'
          },
        },

        sass: {
          options: {
            // includePaths: [''],
            outputStyle: 'compressed', // 'nested' (default), 'expanded', 'compact', 'compressed'
            sourceComments: 'map',
            // sourceMap: 'app/css/app.css.map'
          },
          dist: {
            files: {
              'public/css/main.css': 'public/scss/main.scss'
            }
          }
        },

        /** Warch for files modification **/
        watch: {
          grunt: {
            files: ['Gruntfile.js'],
            tasks: ['sass']
          },
          sass: {
            files: 'public/scss/{,**/}*.scss',
            tasks: ['sass']
          },
          livereload: {
            // files: ['public/*.html', 'public/js/{,**/}*.js', 'public/css/{,*/}*.css', 'public/images/{,*/}*.{jpg,gif,svg,jpeg,png}'],
            files: [
              'public/patternlab/{,**/}*.{js, mustache}',
              'public/*.html',
              'public/js/{,**/}*.js',
              'public/css/{,*/}*.css',
              'public/scss/{,*/}*.scss',
              'public/images/{,*/}*.{jpg,gif,svg,jpeg,png}'
            ],
            options: {
              livereload: true
            }
          }
        },

        /** Create servers **/
        connect: {
          app: {
            options: {
              hostname: 'patternlab.dev',
              port: 9000,
              base: 'public/',
              livereload: true
            }
          },
          dist: {
            options: {
              hostname: 'patternlab.dev',
              port: 9001,
              base: 'dist/',
              keepalive: true
            }
          }
        },

        /** OPEN BROWER **/
        open: {
          app: {
            path: 'http://patternlab.dev:9000/',
            app: 'Google Chrome'
          },
          dist: {
            path: 'http://patternlab.dev:9001/',
            app: 'Google Chrome'
          }
        }

    });

    grunt.loadNpmTasks('grunt-dir2strings');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-open');


    grunt.registerTask('build', ['sass']);
    grunt.registerTask('generateJson', ['dir2strings']);
    grunt.registerTask('default', ['connect:app', 'open:app', 'watch']);

};
