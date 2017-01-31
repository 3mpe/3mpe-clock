/* jshint globalstrict: true */
/* global module, require */
'use strict';

module.exports = function (grunt) {
	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);

	grunt.initConfig({
		meta: {
			dist: 'dist',
			src: 'src',
			tmp: '.tmp',
			pkg: grunt.file.readJSON('package.json'),
			banner: [
				'/*',
				' * <%= meta.pkg.name %> v<%= meta.pkg.version %>',
				' * <%= meta.pkg.homepage %>',
				' * ',
				' * (c) <%= grunt.template.today("yyyy") %> <%= meta.pkg.author.name %> <<%= meta.pkg.author.email %>> (<%= meta.pkg.author.url %>)',
				'*/',
				''
			].join('\n')
		},
		jshint: {
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish'),
				ignores: [
					'<%= meta.dist %>'
				]
			},
			all: [
				'Gruntfile.js',
				'src/**/*.js'
			]
		},
		uglify: {
			dist: {
				files: {
					'<%= meta.dist %>/3mpe-clock.min.js': '<%= meta.dist %>/3mpe-clock.js'
				}
			}
		},
		clean: {
			dist: ['<%= meta.dist %>']
		},

		cssmin: {
			target: {
				files: [{
					expand: true,
					cwd: './src/assets/style',
					src: ['*.css', '!*.min.css'],
					dest: 'dist/assets/style',
					ext: '.min.css'
				}]
			}
		},
		imagemin: {
			dynamic: {
				files: [{
					expand: true, // Enable dynamic expansion
					cwd: 'src/', // Src matches are relative to this path
					src: ['**/*.{png,jpg}'], // Actual patterns to match
					dest: 'dist/' // Destination path prefix
				}]
			}

		},
		htmlmin: { // Task
			dist: { // Target
				options: { // Target options
					removeComments: true,
					collapseWhitespace: true
				},
				files: { // Dictionary of files
					'dist/template/clock.html': 'src/template/clock.html'
				}
			},
			dev: {
				files: [{
					expand: true,
					cwd: 'src',
					src: 'src/template/**/*.html',
					dest: 'dist/template/'
				}]
			}
		},
		usebanner: {
			dist: {
				options: {
					position: 'top',
					banner: '<%= meta.banner %>'
				},
				files: {
					src: ['<%= meta.dist %>/**.*js']
				}
			}
		},
		concat: {
			prepare: {
				options: {
					process: function (src) {
						// Format & remove all 'use strict'; statements.
						return '\t' + src
							.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1')
							.replace(/\n/g, '\n\t');
					}
				},
				src: ['<%= meta.src %>/**/*.js'],
				dest: '<%= meta.tmp %>/3mpe-clock.js'
			},
			dist: {
				src: ['./intro', '<%= meta.tmp %>/3mpe-clock.js', './outro'],
				dest: '<%= meta.dist %>/3mpe-clock.js'
			}
		},
		watch: {
			js: {
				files: ['src/**/*.js'],
				tasks: ['build']
			}
		}
	});

	grunt.registerTask('default', [
		'watch'
	]);

	grunt.registerTask('build', [
		'jshint:all',
		'clean:dist',
		'concat:prepare',
		'concat:dist',
		'uglify:dist',
		'usebanner:dist',
		'cssmin:target',
		'imagemin:dynamic',
		'htmlmin:dist'
	]);
};

