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
            root: 'public/atomise/sources/_patterns',
            dest: 'public/atomise/sources/patterns.json'
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
              'public/atomise/styleguide/css/styleguide.css': 'public/atomise/styleguide/scss/main.scss'
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
            files: 'public/atomise/styleguide/scss/{,**/}*.scss',
            tasks: ['sass']
          },
          livereload: {
            files: [
              'public/styleguide.html',
              'public/atomise/sources/_patterns/**/*.mustache',
              'public/atomise/styleguide/js/{,**/}*.js',
              'public/atomise/styleguide/css/{,*/}*.css',
              'public/atomise/styleguide/scss/{,*/}*.scss',
              'public/atomise/styleguide/images/{,*/}*.{jpg,gif,svg,jpeg,png}'
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
              hostname: 'atomise.dev',
              port: 9000,
              base: 'public/',
              livereload: true
            }
          },
          dist: {
            options: {
              hostname: 'atomise.dev',
              port: 9001,
              base: 'dist/',
              keepalive: true
            }
          }
        },

        /** OPEN BROWER **/
        open: {
          app: {
            path: 'http://atomise.dev:9000/styleguide.html',
            app: 'Google Chrome'
          },
          dist: {
            path: 'http://atomise.dev:9001/styleguide.html',
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
