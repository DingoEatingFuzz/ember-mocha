import createModule from './mocha-module';
import { TestModuleForComponent } from 'ember-test-helpers';

export default function moduleForComponent(name, description, callbacks, testBody) {
  // description and callbacks are both optional arguments
  if (!testBody && callbacks) {
    testBody = callbacks;
    callbacks = undefined;
  } else if(!testBody && description) {
    testBody = description;
    description = undefined;
  }
  createModule(TestModuleForComponent, name, description, callbacks, testBody);
}