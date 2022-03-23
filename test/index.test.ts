import { model } from '../src/index';

describe('model', () => {
  it('returns baseName', () => {
    const baseName = 'Event';
    expect(model(baseName)).toBe(baseName);
  })
});
