import createDescribe from './mocha-describe';
import { TestModule } from 'ember-test-helpers';

export default function describeModule(name, description, callbacks, testBody) {
  // description and callbacks are both optional arguments
  if (!testBody && callbacks) {
    testBody = callbacks;
    callbacks = undefined;
  } else if(!testBody && description) {
    testBody = description;
    description = undefined;
  }
  createDescribe(TestModule, name, description, callbacks, testBody);
}