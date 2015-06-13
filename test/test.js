var expect = require('chai').expect;
var path = require('path');
var babel = require('babel');

describe('babel-plugin-inject-translation', function () {
  it('without config', function () {
    var fixtureFilepath = path.resolve(__dirname, 'fixtures', 'TestInjection.js');
    var result = babel.transformFileSync(fixtureFilepath, {
      plugins: ['../index']
    });
    expect(result.code).to.contain('"test.fixtures.test_injection"');
  });

  it('with cwd config', function () {
    var fixtureFilepath = path.resolve(__dirname, 'fixtures', 'TestInjection.js');
    var result = babel.transformFileSync(fixtureFilepath, {
      plugins: ['../index'],
      extra: {
        injectTranslation: {
          cwd: '/test/'
        }
      }
    });
    expect(result.code).to.contain('"fixtures.test_injection"');
  });
});
