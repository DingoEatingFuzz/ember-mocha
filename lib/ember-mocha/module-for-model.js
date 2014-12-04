import createModule from './mocha-module';
import { TestModuleForModel } from 'ember-test-helpers';

export default function moduleForModel(name, description, callbacks, testBody) {
  // description and callbacks are both optional arguments
  if (!testBody && callbacks) {
    testBody = callbacks;
    callbacks = undefined;
  } else if(!testBody && description) {
    testBody = description;
    description = undefined;
  }
  createModule(TestModuleForModel, name, description, callbacks, testBody);
}