import { spawnSync } from 'child_process';
import { sync as whichSync } from 'which';

const GIT_BIN = whichSync('git');

const MATCHER: jasmine.CustomMatcher = {
  compare(...args: any[]) {
    const actual = args.shift() as string;
    const expected = args.shift() as string;
    const result = spawnSync(GIT_BIN, [
      'diff',
      '--no-prefix',
      '--no-color',
      '--exit-code',
      '--no-index',
      expected,
      actual
    ]);
    switch (result.status) {
      case 0:
        return {
          pass: true
        };
      case 1:
        return {
          message: `Diff:\n${result.stdout
            .toString()
            .split('\n')
            .map(e => `  ${e}`)
            .join('\n')}`,
          pass: false
        };
      default:
        throw new Error(`git command error.\n${result.stderr.toString()}`);
    }
  }
};

function toHaveFiles(util: jasmine.MatchersUtil, customEqualityTesters: jasmine.CustomEqualityTester[]) {
  return MATCHER;
}

export const fileTreeMatcherFactories = {
  toHaveFiles
};
