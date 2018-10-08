import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  bodyEl = document.body
  top = 0

  constructor() {

  }

  stopBodyScroll(isFixed) {
    if (isFixed) {
      this.top = window.scrollY
      this.bodyEl.style.position = 'fixed'
      this.bodyEl.style.top = - this.top + 'px'
    } else {
      this.bodyEl.style.position = ''
      this.bodyEl.style.top = ''
      window.scrollTo(0, this.top) // 回到原先的top
    }
  }

  isMobile() {
    return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
  }

  isIosNoTouch() {
    let ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) {
      Array.from(document.querySelectorAll('.no-touch')).forEach((element) => {
        element.classList.remove('no-touch');
      });
    };
  }

  transformTimestampToDate(item, name) {
    item[name] = item[name].toDate()
    return item;
  }

}
