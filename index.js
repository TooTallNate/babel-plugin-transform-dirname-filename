var path = require('path');

module.exports = function (o) {
  var t = o.types;
  return {
    visitor: {
      Program: function (prog, state) {
        var filename = path.resolve(state.file.opts.filename);

        var operator = '=';

        var left = t.identifier('__dirname');
        var right = t.stringLiteral(path.dirname(filename));
        var dirname = o.types.expressionStatement(o.types.assignmentExpression(operator, left, right));

        left = t.identifier('__filename');
        right = t.stringLiteral(filename);
        var filename = o.types.expressionStatement(o.types.assignmentExpression(operator, left, right));

        prog.scope.block.body.unshift(dirname, filename);
      }
    }
  };
}
