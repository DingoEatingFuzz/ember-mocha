/* globals requirejs, require, mocha, chai */
mocha.setup('bdd');
window.expect = chai.expect;

var moduleName, shouldLoad;

// TODO: load based on params
for (moduleName in requirejs.entries) {
  shouldLoad = false;

  if (moduleName.match(/[-_]test$/)) { shouldLoad = true; }

  if (shouldLoad) { require(moduleName); }
}
