import Loader from './Loader';

const remove = (data: string[], target: string) => data.filter(item => target === item);

export default class ImageLoader extends Loader {
  static ext = '.(jpg|jpeg|png|webp)';

  resources: string[] = [];

  onStart() {}

  onEnd() {}

  onLoading() {}

  onError() {
  }

  handleError(uri: string) {
    this.resources = remove(this.resources, uri);
  }

  checkLoaded(uri: string) {
    return this.resources.find(item => item === uri);
  }

  load (uri: string) {
    // 重复加载
    if (this.checkLoaded(uri)) {
      console.info('');
      return;
    }

    const image = window.Image ? new Image() : document.createElement('img');

    image.addEventListener('load', this.onEnd);

    image.addEventListener('error', this.onError.bind(uri))

    image.src = uri;

    document.body.appendChild(image);
    this.resources.push(uri);
  }
}
