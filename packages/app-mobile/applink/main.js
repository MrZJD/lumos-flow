const ua = navigator.userAgent;
const isAndroid = !!ua.match(/(android)/i);
const isIOS = !!ua.match(/(iPad|iPhone|iPod)/i);

const schema = 'xxx';

const liteSchema = 'xxx';

// function jump() {
//   // window.location = schema // 端内可以唤起
//   alert('123');
// }


document.querySelector('#applink').addEventListener("click", () => {

  try {
    window.location = schema // 端内可以唤起
  } catch (err) {
    console.log('err', err);
  }
  // alert('123');
});

async function tryOpenSchema(schema) {
  return new Promise((resolve, reject) => {
    // 如果是手机端 => 则尝试直接唤起app
    if (isAndroid || isIOS) {
      console.log('跳转')
      window.location = schema // 端内可以唤起
    }

    setTimeout(() => {
      console.log('------ -1')
      resolve(-1)
    }, 100)
  })
}

async function main() {
  // 先开抖音
  const res = await tryOpenSchema(schema);

  // 再判断开抖极
  await tryOpenSchema(liteSchema);

  // 都没打开
  console.log('都没有安装，引导下载')


  // window.location = schema // 端内可以唤起
}

setTimeout(() => {
  main()

  // openAppByIframe()
  // openAppBySDK()
}, 100)

// https://juejin.cn/post/6844903664155525127
