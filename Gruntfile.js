'use strict';

module.exports = function (grunt) {

  // add grunt tasks.
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-apidoc');

  grunt.initConfig({
    apidoc: {
      api: {
        src: 'lib/',
        dest: 'docs/',
        options: {
          debug: true,
          includeFilters: ['.*\\.js$'],
          excludeFilters: ['node_modules/']
        }
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          timeout: 20000
        },
        src: ['test/**/*.js']
      },
      unit: {
        options: {
          reporter: 'spec',
          timeout: 20000
        },
        src: [
          'test/**/*.js',
          'test/unit/**/*.js',
          '!test/integration/**/*.js'
        ]
      }
    },
    jshint: {
      options: {
        reporter: require('jshint-stylish'),
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'index.js',
        'lib/**/*.js',
        'test/**/*.js'
      ]
    },
    watch: {
      all: {
        files: [
          'Gruntfile.js',
          'index.js',
          'lib/**/*.js',
          'test/**/*.js'
        ],
        tasks: ['default']
      }
    }
  });

  //custom tasks
  grunt.registerTask('default', ['jshint', 'mochaTest', 'watch']);
  grunt.registerTask('test', ['jshint', 'mochaTest']);
  grunt.registerTask('unit', ['jshint', 'mochaTest:unit']);
  grunt.registerTask('doc', ['jshint', 'apidoc:api']);

};