import { Component, AfterViewInit, OnInit, HostListener, Inject, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs/internal/operators/filter';
import { map } from 'rxjs/internal/operators/map';
import { mergeMap } from 'rxjs/internal/operators/mergeMap';
import { FirebaseService } from './core/services/firebase.service';
import { DOCUMENT } from "@angular/platform-browser";
import { UtilService } from './core/services/util.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit {
  isUserLogin = false;
  isOpenMenu = false;
  userName = '';
  style = 'none';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private firebaseService: FirebaseService,
    private utilService: UtilService,
    @Inject(DOCUMENT) private document: Document
  ) {

  }

  @HostListener("window:scroll", ['$event'])
  onWindowScroll(e: Event) {
    this.style = this.document.documentElement.scrollTop >= 600 || this.document.body.scrollTop >= 600 ? 'block' : 'none'
  }

  isLogin() {
    this.document.body.scrollTop = 0;
    this.firebaseService.isLogin().subscribe(isLogin => {
      this.isUserLogin = isLogin;
      if (this.isUserLogin) {
        this.firebaseService.getUserInfo().subscribe((user: any) => {
          this.userName = user[0].name;
        }, (error) => {
          this.router.navigate(['/backend/login'])
        });
      }
    });
  }

  ngOnInit() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) route = route.firstChild;
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        mergeMap((route) => route.data)
      )
      .subscribe((event) => {
        this.titleService.setTitle(event['title']);
      });
  }

  ngAfterViewInit() {
    this.utilService.preloadImg([
      './assets/images/animal-koala-001.png',
      './assets/images/person-family-001.png',
      './assets/images/animal-cat-004.png'
    ]);
  }

}
