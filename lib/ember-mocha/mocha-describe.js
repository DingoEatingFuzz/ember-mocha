import { getContext } from 'ember-test-helpers';

export default function createDescribe(Constructor, name, description, callbacks, testBody) {
  var args = Array.prototype.slice.call(arguments);
  testBody = args.pop();

  var module = new Constructor(args[1], args[2], args[3]);

  describe(module.name, function() {
    beforeEach(function() {
      module.setup();

      var context = getContext();
      for (var i in context) {
        this[i] = context[i];
      }
    });

    afterEach(function() {
      module.teardown();
    });

    testBody();
  });
}