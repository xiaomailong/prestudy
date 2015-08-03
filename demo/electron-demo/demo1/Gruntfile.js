module.exports = function(grunt) {
  grunt.initConfig({
    'build-atom-shell': {
      tag: 'v0.19.5',
      nodeVersion: '0.18.0',
      buildDir: (process.env.TMPDIR || process.env.TEMP || '/tmp') + '/atom-shell',
      projectName: 'electrondemo',
      productName: 'ElectronDemo'
    }
  });

  grunt.loadNpmTasks('grunt-build-atom-shell');

  grunt.registerTask('default', ['build-atom-shell']);
};
