import Ember from 'ember';
import { describeComponent } from 'ember-mocha';
import { setResolverRegistry } from 'tests/test-support/resolver';

var PrettyColor = Ember.Component.extend({
  classNames: ['pretty-color'],
  attributeBindings: ['style'],
  style: function(){
    return 'color: ' + this.get('name') + ';';
  }.property('name')
});

function setupRegistry() {
  setResolverRegistry({
    'component:x-foo': Ember.Component.extend(),
    'component:pretty-color': PrettyColor,
    'template:components/pretty-color': Ember.Handlebars.compile('Pretty Color: <span class="color-name">{{name}}</span>')
  });
}

var config = {
  beforeSetup: function() {
    setupRegistry();
  }
};

describeComponent('x-foo', config, function() {
  it('should render', function() {
    var component = this.subject();
    expect(component._state).to.equal('preRender');
    this.render();
    expect(component._state).to.equal('inDOM');
  });

  it('should append to the DOM', function() {
    var component = this.subject();
    expect(component._state).to.equal('preRender');
    this.append();
    expect(component._state).to.equal('inDOM');
    // TODO - is there still a way to check deprecationWarnings?
    // ok(Ember.A(Ember.deprecationWarnings).contains('this.append() is deprecated. Please use this.render() instead.'));
  });

  it('should yield', function() {
    var component = this.subject({
      layout: Ember.Handlebars.compile("yield me")
    });
    expect(component._state).to.equal('preRender');
    this.render();
    expect(component._state).to.equal('inDOM');
  });

  it('can lookup components in its layout', function() {
    var component = this.subject({
      layout: Ember.Handlebars.compile("{{x-foo id='yodawg-i-heard-you-liked-x-foo-in-ur-x-foo'}}")
    });
    this.render();
    expect(component._state).to.equal('inDOM');
  });

  it('clears out views from test to test', function() {
    this.subject({
      layout: Ember.Handlebars.compile("{{x-foo id='yodawg-i-heard-you-liked-x-foo-in-ur-x-foo'}}")
    });
    this.render();
    expect(true, 'rendered without id already being used from another test').to.be.ok;
  });
});

describeComponent('pretty-color', config, function() {
  it("has the pretty-color className", function() {
    // first call to this.$() renders the component.
    expect(this.$().is('.pretty-color')).to.be.ok;
  });

  it("uses the correct template", function() {
    var component = this.subject();

    expect(this.$().text()).to.contain('Pretty Color:');

    Ember.run(function() {
      component.set('name', 'green');
    });

    expect(this.$().text()).to.contain('Pretty Color: green');
  });

  it("supports properties passed into the subject call", function() {
    var component = this.subject({ name: 'green' });
    expect(this.$('.color-name').text()).to.contain('green');
    expect(this.$().text()).to.contain('Pretty Color: green');
  });
});

