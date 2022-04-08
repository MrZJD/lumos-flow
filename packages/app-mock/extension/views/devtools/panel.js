const { get, set } = idbKeyval;

class DataManger {
  data = [];
  onChange = null;
  STORAGE_KEY = 'LUMOS_MOCK_FILES';

  constructor(callback) {
    this.onChange = callback;
    this.initData();
  }

  updateData (target, needStorageUpdate = true) {
    this.data = target || [];
    this.onChange?.();
    needStorageUpdate && set(this.STORAGE_KEY, this.data);
  }

  async initData () {
    const result = await get(this.STORAGE_KEY);
    this.updateData(result, false);
  }

  addData (source) {
    const exist = this.data.find(item => item.path === source.webkitRelativePath && item.name === source.name);

    if (exist > -1) {
      alert('文件已存在～');
      return;
    }

    this.updateData(this.data.concat([{
      status: 'enable',
      name: source.name,
      path: source.webkitRelativePath,
      handler: source
    }]));
  }
}

class App {
  _fs = null;

  dataManager = new DataManger(() => { this.render() });

  eleList = document.querySelector('#list');
  eleAddBtn = document.querySelector('#addFile');

  constructor() {
    this._initEvts();
  }

  _initEvts() {
    this.eleAddBtn.addEventListener('click', async () => {
      if (!this._fs) {
        return;
      }

      const [fileHandle] = await window.showOpenFilePicker({
        types: [
          {
            description: 'mock config',
            accept: {
              'application/json': ['.json']
            }
          }
        ],
        excludeAcceptAllOption: true,
        multiple: false
      });

      const file = await fileHandle.getFile();

      this.dataManager.addData(file);
    });
  }

  bootstrap() {
    const requestFs = window.requestFileSystem || window.webkitRequestFileSystem;

    if (!requestFs) {
      alert('暂不支持 FS');
      return;
    }

    requestFs(window.TEMPORARY, 1024*1024, (fs) => {
      this._fs = fs;
    }, () => {
      console.error('获取文件系统异常');
    });
  }

  render() {
    const data = this.dataManager.data;

    if (!data || data.length === 0) {
      this.eleList.innerHTML = '<p class="tip">暂无mock配置，请 ⬇️ 点击下方按钮添加</p>';
      return;
    }
  
    this.eleList.innerHTML = data.map(item => {
      return `<div class="item">
        <span class="item-switch ${item.status === 'enable' ? 'checked' : ''}"></span>
        <span class="item-filename">${item.name}</span>
        <span class="item-filepath">${item.path || '-'}</span>
        <span class="item-delete">❌</span>
      </div>`;
    }).join('');
  }
}

(new App()).bootstrap();
