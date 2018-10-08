import { Component, OnInit, ElementRef, ChangeDetectorRef, Input } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  host: {
    '(document:click)': 'onClick($event)',
    'class': 'header'
  },
})
export class HeaderComponent implements OnInit {
  _isLogin = false;

  get isLogin() {
    return this._isLogin;
  }
  @Input()
  set isLogin(isLogin) {
    this._isLogin = isLogin;
  }
  conditionModel = {
    isOpen: false
  }
  areaModel = {
    isOpen: false
  }
  shelterModel = {
    isOpen: false
  }
  isOpenMenu = false;

  constructor(
    private eRef: ElementRef,
    public changeDetectorRef: ChangeDetectorRef,
    public firebaseService: FirebaseService,
    private utilService:UtilService
  ) { 

  }

  onClick(event) {
    if (document.getElementsByClassName('nav')[0].contains(event.target) === false) {
      this.isOpenMenu = false;
    };
  }

  openMenu() {
    this.isOpenMenu = true;
  }

  closeMenu() {
    this.isOpenMenu = false;
  }

  openModel(name) {
    this[name].isOpen = true;
    this[name] = { ...this[name] };
  }

  ngOnInit() {
    this.utilService.isIosNoTouch();
  }

}
