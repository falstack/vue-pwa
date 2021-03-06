import Vue from 'vue';
import VueToast from './toast.vue';

const timeout = (duration = 0) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, duration);
  });
};

function newVue(dom) {
  let selector = 'v-app-loading-' + Math.random().toString(36).substring(3, 6);
  let el = document.createElement('div');
  let parent = dom ? dom : document.body;

  el.id = selector;
  parent.appendChild(el);

  return new Vue(VueToast).$mount('#' + selector);
}

class Toast {
  constructor() {
    this._vm = undefined;
  }

  showToast(opts, duration, dom) {
    let tip, timer, el;
    if (typeof opts === 'string') {
      el = dom;
      tip = opts;
      timer = duration || 1500;
    } else {
      el = opts.el;
      tip = opts.tip;
      timer = opts.time || 1500;
    }

    if (this._vm && this._vm.getState() > 0) {
      this._vm.update({
        tip: tip,
        icon: opts.icon,
        showIcon: opts.showIcon,
        position: opts.position
      });

      setTimeout(() => {
        this._vm.hide();
      }, timer);

      return;
    }

    this._vm = newVue(el);

    this._vm.show({
      tip: tip,
      icon: opts.icon,
      showIcon: opts.showIcon,
      position: opts.position
    });

    return timeout(timer).then(() => {
      return this._vm.hide();
    });
  }

  showLoading(opts, dom) {
    let tip;
    if (typeof opts === 'string') {
      tip = opts;
    } else {
      tip = opts.tip;
    }

    if (this._vm && this._vm.getState() > 0) {
      this._vm.update({
        tip: tip,
        showIcon: true,
        position: opts.position
      });
      return;
    }

    this._vm = newVue(dom);

    this._vm.show({
      tip: tip,
      showIcon: true,
      position: opts.position
    });
  }

  hide() {
    if (this._vm) this._vm.hide();
  }

  update(options) {
    this._vm.update(options);
  }
}

let toast = new Toast();

window.$loading = {
  show: toast.showLoading,
  hide: toast.hide
};

window.$toast = {
  show: toast.showToast,
  hide: toast.hide
};
