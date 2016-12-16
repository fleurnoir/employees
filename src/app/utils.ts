export function withLog<T>(promise: Promise<T>): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    promise.then(result => resolve(result))
      .catch(err => {
        console.error(err);
        resolve(null);
      });
  });
}
