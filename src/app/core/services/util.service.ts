import { Injectable, Inject, Renderer2, RendererFactory2 } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class UtilService {
  private renderer: Renderer2;
  top = 0

  constructor(
    @Inject(DOCUMENT) private document: Document,
    rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  stopBodyScroll(isLock) {
    if (isLock) {
      this.top = window.scrollY
      this.renderer.setStyle(this.document.body, 'position', 'fixed');
      this.renderer.setStyle(this.document.body, 'top', - this.top + 'px');
    } else {
      this.renderer.setStyle(this.document.body, 'position', '');
      this.renderer.setStyle(this.document.body, 'top', '');
      window.scrollTo(0, this.top);
    };
  }

  isMobile() {
    return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
  }

  isIosNoTouch() {
    let ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) {
      Array.from(this.document.querySelectorAll('.no-touch')).forEach((element) => {
        element.classList.remove('no-touch');
      });
    };
  }

  transformTimestampToDate(item, name) {
    item[name] = item[name].toDate()
    return item;
  }

  preloadImg(images: string[]) {
    images.forEach((src) => {
      let img = new Image();
      img.src = src;
    });
  }

}
