var path = require('path');
var walk = require('estree-walker').walk;


function uses (prog, variables) {
  var results = variables.reduce(function (o, name) {
    o[name] = false;
    return o;
  }, {});

  walk(prog.scope.block, {
    enter: function (node) {
      if ('Identifier' === node.type) {
        if (node.name in results) {
          results[node.name] = true;
        }
      }
    }
  });

  return results;
}


function inject (t, prog, variable, value) {
  var operator = '=';

  var left = t.identifier(variable);
  var right = t.stringLiteral(value);
  var expr = t.expressionStatement(t.assignmentExpression(operator, left, right));

  prog.scope.block.body.unshift(expr);
}


module.exports = function (o) {
  var t = o.types;
  return {
    visitor: {
      Program: function (prog, state) {
        var filename = path.resolve(state.file.opts.filename);
        var results = uses(prog, ['__dirname', '__filename']);

        if (results.__dirname) {
          inject(t, prog, '__dirname', path.dirname(filename));
        }

        if (results.__filename) {
          inject(t, prog, '__filename', filename);
        }
      }
    }
  };
}
