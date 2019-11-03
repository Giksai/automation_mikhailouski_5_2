exports.config = {
    framework: 'jasmine2',
    specs: ['spec/mainSpec.js'],
    onPrepare: function() {
      var AllureReporter = require('jasmine-allure-reporter');
      jasmine.getEnv().addReporter(new AllureReporter({
        resultsDir: 'allure-results'
      }));
    }
  }