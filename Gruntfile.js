module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
    
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },

                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['**/*.scss'],
                    dest: 'build/',
                    ext: '.css'
                }]
            }
        },

        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'last 2 Chrome versions', '> 1% in US'],
            },
            multiple_files: {
                expand: true,
                cwd: 'build/',
                src: ['**/*.css'],
                dest: 'build/',
                ext: '.css'
            }
        },

        react: {
            files: {
                expand: true,
                cwd: 'src/',
                src: ['**/*.jsx'],
                dest: 'build/',
                ext: '.js'
            }
        },

        copy: {
            main: {
                expand: true,
                cwd: 'src/lib',
                src: '**',
                dest: 'build/lib'
            }
        },

        jade: {
            html: {
                files: {
                    'build/' : 'src/**/*.jade'
                },

                options: {
                    client: false
                }
            }
        },

        uglify: {
            my_target: {
                files: [{
                    expand: true,
                    cwd: 'build/js/',
                    src: '**/*.js',
                    dest: 'build/js',
                    ext: '.js'
                }]
            }
        },

        watch: {
            scripts: {
                files: ['src/**/*.jsx', 'src/**/*.js', 'src/**/*.scss', 'src/**/*.jade'],
                tasks: ['autoprefixer', 'sass', 'react', 'jade', 'copy', 'uglify'],
                options: {
                    spawn: false,
                },
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-react');
    grunt.loadNpmTasks('grunt-jade');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('test', ['sass', 'autoprefixer', 'react', 'jade','copy', 'uglify']);
    grunt.registerTask('default', ['watch']);
};