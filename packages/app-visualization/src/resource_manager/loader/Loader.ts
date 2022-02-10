
export default abstract class Loader {
  static ext: string;

  onStart() {}

  onEnd() {}

  onLoading() {}

  onError() {}

  load (uri: string) {}
}
