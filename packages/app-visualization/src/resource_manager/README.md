# 资源加载器

```typescript
const manager = new ResourceManager();
// const imageLoader = new ImageLoader();
// const jsLoader = new JSLoader();
// const styleLoader = new StyleLoader();

manager.addLoader(
  [ImageLoader.ext, new ImageLoader()],
  [JSLoader.ext, new JSLoader()],
  [StyleLoader.ext, new StyleLoader()]
);

manager.onLoading();

manager.onStart();

manager.onEnd();

manager.onError();

manager.onAbort();

manager.load();
manager.abort();
```
