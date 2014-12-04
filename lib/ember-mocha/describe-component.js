import createDescribe from './mocha-describe';
import { TestModuleForComponent } from 'ember-test-helpers';

export default function describeComponent(name, description, callbacks, testBody) {
  // description and callbacks are both optional arguments
  if (!testBody && callbacks) {
    testBody = callbacks;
    callbacks = undefined;
  } else if(!testBody && description) {
    testBody = description;
    description = undefined;
  }
  createDescribe(TestModuleForComponent, name, description, callbacks, testBody);
}