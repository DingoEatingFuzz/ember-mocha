import createModule from './mocha-module';
import { TestModule } from 'ember-test-helpers';

export default function moduleFor(name, description, callbacks, testBody) {
  // description and callbacks are both optional arguments
  if (!testBody && callbacks) {
    testBody = callbacks;
    callbacks = undefined;
  } else if(!testBody && description) {
    testBody = description;
    description = undefined;
  }
  createModule(TestModule, name, description, callbacks, testBody);
}