import { moduleFor } from 'ember-mocha';
import { setResolverRegistry } from 'tests/test-support/resolver';

function setupRegistry() {
  setResolverRegistry({
    'component:x-foo': Ember.Component.extend()
  });
}

var a = 0;
var b = 0;
var beforeSetupOk = false;
var beforeTeardownOk = false;

var config = {
  beforeSetup: function() {
    setupRegistry();

    beforeSetupOk = (a === 0);
    b += 1;
  },

  setup: function() {
    a += 1;
  },

  beforeTeardown: function() {
    beforeTeardownOk = (a === 1);
    b -= 1;
  },

  teardown: function() {
    a -= 1;
  }
};

moduleFor('component:x-foo', 'TestModule callbacks', config, function() {
  it("should call the beforeSetup callback prior to any test setup", function() {
    expect(beforeSetupOk).to.be.ok;
    expect(b).to.equal(1);
  });

  it("should call the setup callback prior to tests", function() {
    expect(a).to.equal(1);
  });

  it("should call the teardown callback after tests", function() {
    expect(a).to.equal(1);
  });

  it("should call beforeTeardown prior to any test teardown", function() {
    expect(beforeTeardownOk).to.be.ok;
    expect(b).to.equal(1);
  });
});

