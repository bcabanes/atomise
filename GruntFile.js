'use strict';

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        /** GENERATE JSON PATTERNS LIBRARY **/
        dir2json: {
            options: {
                exclude: '**/*.md',
                processContent: function(content, srcpath){
                    return srcpath; // return juste the filename with extension
                }
            },
            data: {
              root: 'public/sources/_patterns',
              dest: 'public/sources/patterns.json'
            },
        },

        /** Warch for files modification **/
        watch: {
            grunt: {
                files: ['Gruntfile.js'],
                // tasks: ['sass']
            },
            sass: {
                files: 'public/scss/**/*.scss',
                tasks: ['sass']
            },
            livereload: {
                // files: ['public/*.html', 'public/js/{,**/}*.js', 'public/css/{,*/}*.css', 'public/images/{,*/}*.{jpg,gif,svg,jpeg,png}'],
              files: [
                'public/patternlab/{,**/}*.{js, mustache}',
                'public/*.html',
                'public/js/{,**/}*.js',
                'public/css/{,*/}*.css',
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

    grunt.loadNpmTasks('grunt-dir2json');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-open');


    grunt.registerTask('build', ['sass']);
    grunt.registerTask('generateJson', ['dir2json']);
    grunt.registerTask('default', ['connect:app', 'open:app', 'watch']);

};
