import { expect, test } from '@jest/globals';
import { rootReducer } from './root-reducer';
import store from '../services/store';

test('rootReducer initialization', () => {
  const result = rootReducer(undefined, { type: '' });
  expect(result).toEqual(store.getState());
});
