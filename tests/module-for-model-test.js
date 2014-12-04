import Ember from 'ember';
import { describeModel } from 'ember-mocha';
import { setResolverRegistry } from 'tests/test-support/resolver';

var Whazzit = DS.Model.extend({ gear: DS.attr('string') });
var whazzitAdapterFindAllCalled = false;
var WhazzitAdapter = DS.FixtureAdapter.extend({
  findAll: function(store, type) {
    whazzitAdapterFindAllCalled = true;
    return this._super.apply(this, arguments);
  }
});

var ApplicationAdapter = DS.FixtureAdapter.extend();

function setupRegistry() {
  setResolverRegistry({
    'model:whazzit': Whazzit,
    'adapter:whazzit': WhazzitAdapter,
    'adapter:application': ApplicationAdapter
  });
}

var config = {
  beforeSetup: function() {
    setupRegistry();
  },

  setup: function() {
    Whazzit.FIXTURES = [];
  }
};

var adapterConfig = {
  needs: ['adapter:whazzit'],

  beforeSetup: function() {
    setupRegistry();
  },

  setup: function() {
    Whazzit.FIXTURES = [];
    whazzitAdapterFindAllCalled = false;
  }
};

var appAdapterConfig = {
  needs: ['adapter:application'],

  beforeSetup: function() {
    setupRegistry();
  },

  setup: function() {
    Whazzit.FIXTURES = [];
  }
};

describeModel('whazzit', 'model:whazzit without adapter', config, function() {
  it('should have a store', function() {
    var store = this.store();
    expect(store instanceof DS.Store).to.be.ok;
  });

  it('should have the model as the subject', function() {
    var model = this.subject();
    expect(model).to.be.ok;
    expect(model instanceof DS.Model).to.be.ok;
    expect(model instanceof Whazzit).to.be.ok;
  });

  it('uses the FixtureAdapter', function() {
    var model = this.subject(),
      store = this.store();

    expect(store.adapterFor(model.constructor) instanceof DS.FixtureAdapter).to.be.ok;
    expect(store.adapterFor(model.constructor) instanceof WhazzitAdapter).to.not.be.ok;
  });
});

describeModel('whazzit', 'model:whazzit with custom adapter', adapterConfig, function() {
  it('uses the WhazzitAdapter', function() {
    var model = this.subject(),
      store = this.store();

    expect(store.adapterFor(model.constructor) instanceof WhazzitAdapter).to.be.ok;
  });

  it('uses WhazzitAdapter for `find`', function() {
    expect(whazzitAdapterFindAllCalled, 'precond - custom adapter has not yet been called').to.not.be.ok;

    var store = this.store();

    return Ember.run(function() {
      return store.find('whazzit').then(function() {
        expect(whazzitAdapterFindAllCalled, 'uses the custom adapter').to.be.ok;
      });
    });
  });
});

describeModel('whazzit', 'model:whazzit with application adapter', appAdapterConfig, function() {
  it('uses the ApplicationAdapter', function() {
    var model = this.subject(),
        store = this.store();

    expect(store.adapterFor(model.constructor) instanceof ApplicationAdapter).to.be.ok;
    expect(store.adapterFor(model.constructor) instanceof WhazzitAdapter).to.not.be.ok;
  });
});
