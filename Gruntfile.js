module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        /** GENERATE JSON PATTERNS LIBRARY **/
        dir2strings: {
            options: {
                exclude: '**/*.md'
            },
            data: {
                root: 'app/sources/_patterns',
                dest: 'app/sources/patterns.json'
            },
        },

        'autoprefixer': {
            'options': {
                'browsers': [
                    'ie 9', 'ie 10',
                    'last 2 versions'
                ]
            },
            'app': {
                'src': 'app/assets/styles/css/app.min.css'
            }
        },

        'clean': {
            'usemin': '.tmp',
            'www': [
                'www/*',
                '!www/.gitignore'
            ]
        },

        'connect': {
            'server': {
                'options': {
                    'port': 4000,
                    'base': 'app',
                    'livereload': true,
                    'middleware': function (connect, options) {
                        var middlewares = [];

                        middlewares.push(require('connect-modrewrite')([
                            '^[^\\.]*$ /index.html [L]'
                        ]));

                        options.base.forEach(function (base) {
                            middlewares.push(connect.static(base));
                        });

                        return middlewares;
                    }
                }
            }
        },

        'copy': {
            'app': {
                'files': [{
                    'src': '*',
                    'dot': true,
                    'cwd': 'app/',
                    'dest': 'www/',
                    'expand': true,
                    'filter': 'isFile'
                }]
            },
            'ionicons': {
                'files': [{
                    'src': '*',
                    'cwd': 'app/assets/vendors/ionic/release/fonts/',
                    'dest': 'www/assets/fonts/',
                    'expand': true,
                    'filter': 'isFile'
                }]
            }
        },

        'filerev': {
            'www': {
                'src': [
                    'www/assets/scripts/**/*',
                    'www/assets/styles/**/*'
                ]
            }
        },

        'htmlmin': {
            'app': {
                'files': [{
                    'src': '**/*',
                    'cwd': 'app/assets/partials/',
                    'dest': 'www/assets/partials/',
                    'expand': true,
                    'filter': 'isFile'
                }]
            }
        },

        'imagemin': {
            'app': {
                'files': [{
                    'src': '**/*',
                    'cwd': 'app/assets/images/',
                    'dest': 'www/assets/images/',
                    'expand': true,
                    'filter': 'isFile'
                }]
            }
        },

        'jshint': {
            'options': {
                'jshintrc': '.jshintrc',
                'reporter': require('jshint-stylish')
            },
            'app': [
                'app/assets/scripts/js/**/*'
            ]
        },

        'ngconstant': {
            'options': {
                'name': 'app.core',
                'template': grunt.file.read('constants.ejs'),
                'dest': 'app/assets/scripts/js/modules/core/constants.js'
            },
            'dev': {
                'constants': {
                    'CSSFile': ['http://pathtocssfile'],
                    'JSFile': ['http://pathtojsfile']
                }
            }
        },

        'sass': {
            'options': {
                'sourceMap': true,
                'outputStyle': 'compressed',
                'includePaths': [ 'app/assets/vendors/normalize-scss/' ],
            },
            'app': {
                'src': 'app/assets/styles/scss/app.scss',
                'dest': 'app/assets/styles/css/app.min.css'
            }
        },

        'usemin': {
            'options': {
                'patterns': {
                    'js': [[/(images\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm]]
                }
            },
            'js': 'www/assets/scripts/**/*',
            'css': 'www/assets/styles/**/*',
            'html': [
                'www/index.html',
                'www/assets/partials/**/*'
            ]
        },

        'useminPrepare': {
            'options': {
                'dest': 'www'
            },
            'html': 'app/index.html'
        },

        'watch': {
            'options': {
                'debounceDelay': 200
            },
            'grunt': {
                'options': {
                    'reload': true
                },
                'tasks': 'ngconstant:dev',
                'files': 'Gruntfile.js'
            },
            'partials': {
                'options': {
                    'livereload': true
                },
                'files': 'app/assets/partials/**/*'
            },
            'sass': {
                'tasks': 'styles',
                'files': 'app/assets/styles/scss/**/*',
            },
            'scripts': {
                'options': {
                    'livereload': true
                },
                'files': 'app/assets/scripts/**/*'
            },
            'styles': {
                'options': {
                    'livereload': true
                },
                'files': 'app/assets/styles/css/**/*'
            }
        }
    });

    grunt.task.registerTask('styles', function () {
        grunt.task.run([
            'sass:app',
            'autoprefixer:app'
        ]);
    });

    grunt.task.registerTask('build', function () {
        grunt.task.run([
            'styles',
            'ngconstant:dev',
            'connect:server',
            'watch'
        ]);
    });

    grunt.task.registerTask('deploy', function () {
        var env = grunt.option('env') || 'live';

        grunt.task.run([
            'clean:www',
            'copy:app',
            'copy:ionicons',
            'styles',
            'ngconstant:' + env,
            'jshint',
            'htmlmin:app',
            'imagemin:app',
            'useminPrepare',
            'concat:generated',
            'cssmin:generated',
            'uglify:generated',
            'filerev:www',
            'usemin',
            'clean:usemin'
        ]);
    });



    grunt.registerTask('getPatterns', ['dir2strings']);
};
