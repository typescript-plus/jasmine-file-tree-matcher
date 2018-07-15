import * as path from 'path';
import { fileTreeMatcherFactories } from '../src';

const TEST_DIR = path.join(__dirname, 'test');

// tslint:disable-next-line:no-unbound-method
const compare = fileTreeMatcherFactories.toHaveFiles(jasmine.matchersUtil, []).compare;

describe(__filename, () => {
  it('succeeds.', () => {
    const baseDir = path.join(TEST_DIR, 'succeeds');
    const result = compare(path.join(baseDir, 'actual'), path.join(baseDir, 'expected'));
    expect(result.message).toBeUndefined();
    expect(result.pass).toBe(true);
  });

  it('fails.', () => {
    const baseDir = path.join(TEST_DIR, 'fails');
    const actualDir = path.join(baseDir, 'actual');
    const expectedDir = path.join(baseDir, 'expected');
    const result = compare(actualDir, expectedDir);
    expect(result.message).not.toBeUndefined();
    expect(result.pass).toBe(false);
  });
});
