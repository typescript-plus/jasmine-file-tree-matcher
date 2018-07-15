declare namespace jasmine {
  interface Matchers<T> {
    toHaveFiles(expected: string): void;
  }
}
