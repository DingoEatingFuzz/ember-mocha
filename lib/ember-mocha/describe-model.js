import createDescribe from './mocha-describe';
import { TestModuleForModel } from 'ember-test-helpers';

export default function describeModel(name, description, callbacks, testBody) {
  // description and callbacks are both optional arguments
  if (!testBody && callbacks) {
    testBody = callbacks;
    callbacks = undefined;
  } else if(!testBody && description) {
    testBody = description;
    description = undefined;
  }
  createDescribe(TestModuleForModel, name, description, callbacks, testBody);
}