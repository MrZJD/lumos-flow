const { Subject, fromEvent, of } = rxjs;

function initComponent({ state, onInit, render }) {
    const _state = {
      value: undefined
    };
    const _subject = new Subject();


    const $ = (...args) => {
      // resolve dom holder
      return document.querySelector(...args)
    }
  
    // state sync
    _subject.subscribe((input) => {
      _state.value = input;
      render($, _state.value);
    });
  
    _subject.next(state);
  
    const setState = (fn) => {
      _subject.next(fn(_state.value));
    }

    const _ref = {
      setState,
      destory () {
        // release all listener
      }
    };

    onInit.call(_ref, $);
  
    return _ref;
}

initComponent({
  namespace: '#todo',
  state: {
    num: 0,
    loading: false
  },
  onInit ($) {
    // 处理事件
    fromEvent($('#add-btn'), 'click').subscribe(() => {
      this.setState(s => ({ ...s, num: s.num + 1 }))
    })

    // 处理异步逻辑
    this.setState(s => ({ ...s, loading: true }))
    new Promise((res) => {
      setTimeout(() => res({ num: 10 }), 1000)
    }).then((res) => {
      this.setState(s => ({ num: res.num, loading: false }))
    })
  },
  // 处理UI
  // 处理UI最好的方式仍然是JSX -> 唯一的问题就是需要compiler + boostraper
  render ($, state) {
    console.log('[render] ->', state);
    $('#todo').innerText = state.loading ? 'loading' : state.num;
  }
})
