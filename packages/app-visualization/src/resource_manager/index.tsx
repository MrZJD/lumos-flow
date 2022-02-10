import Loader from "./loader/Loader";

const last = (arr: any[]) => arr[arr.length - 1];

const getExtFromUri = (uri: string) => {
  return last(uri.split('?')[0].split('/')).split('.')
};

const isLegalUri = (uri: string) => {
  return true;
}

export default class ResourceManager {
  // private loaders: Loader[] = [];
  private loaders: Record<string, Loader> = {};
  private exts: string[] = [];
  private extsMap: Record<string, Loader> = {};

  constructor() {}

  addLoader(...args: [string, Loader][]) {
    args.forEach(([ext, loader]) => {
      this.loaders[ext] = loader;
    });

    this.exts = Object.keys(this.loaders);
  }

  load(resources: string[]) {
    resources.forEach(uri => {
      if (!isLegalUri(uri)) {
        return;
      }

      const ext = getExtFromUri(uri);

      if (this.extsMap[ext]) {
        this.extsMap[ext].load(uri);
        return;
      }

      const matchExt = this.exts.find(extReStr => new RegExp(extReStr).test(`.${ext}`));

      if (!matchExt) {
        console.info('[ResourceManager]', '未找到该资源的loader', uri);
        return;
      }

      this.extsMap[ext] = this.loaders[matchExt];
      this.extsMap[ext].load(uri);
      return;
    });
  }
}
