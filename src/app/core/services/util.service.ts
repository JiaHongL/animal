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

  isMobile(){
    return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
  }

}
