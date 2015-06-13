var underscored = require('underscore.string').underscored;
var replaceExt = require('replace-ext');

function pathToTranslation(filename, options) {
  var replacement = [process.cwd()];
  if (options.cwd) {
    replacement.push(options.cwd);
  } else {
    replacement.push('/');
  }

  var cwd = replacement.join('');
  var file = filename.split('!').pop();

  return underscored(replaceExt(file, '').replace(cwd, '').replace(/\//g, '.'));
}

module.exports = function(babel) {
  var injectTranslation = {
    enter: function(node, parent, scope, file) {
      var options = file.opts.extra.injectTranslation || {};

      node.body.body.unshift({
        type: 'ClassProperty',
        key: {
          name: 'TRANSLATION_DOMAIN',
          type: 'Identifier'
        },
        value: {
          value: pathToTranslation(file.opts.filename, options),
          type: 'Literal'
        },
        static: true,
        computed: false
      });
    }
  };

  return new babel.Transformer('inject-translation', {
    ClassDeclaration: injectTranslation
  });
};
