'use strict';

module.exports = function clean(grunt) {
  // Load task
  grunt.loadNpmTasks('grunt-sonar-runner');

  // Options
  return {
    analysis: {
      options: {
        debug: true,
        separator: '\n',
        sonar: {
          host: {
            url: 'http://10.101.46.20:9000'
          },
          jdbc: {
            url: 'jdbc:mysql://10.101.46.20:3306/sonar',
            username: 'sonar',
            password: 'sonar'
          },
          javascript: {
            lcov: {
              reportPath: 'coverage/lcov.info'
            }
          },

          projectKey: 'Demo:0.1.0',
          projectName: 'Demo project',
          projectVersion: '0.1.0',
          sources: ['controllers','models','lib'].join(','),
          language: 'js',
          sourceEncoding: 'UTF-8'
        }
      }
    }
  };
};
