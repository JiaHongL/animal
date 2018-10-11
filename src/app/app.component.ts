import { Component, AfterViewInit, OnInit, NgZone, ChangeDetectorRef, ElementRef, HostListener, Inject, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs/internal/operators/filter';
import { map } from 'rxjs/internal/operators/map';
import { mergeMap } from 'rxjs/internal/operators/mergeMap';
import { FirebaseService } from './core/services/firebase.service';
import { DOCUMENT } from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit {
  isUserLogin = false;
  isOpenMenu = false;

  userName = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private firebaseService: FirebaseService,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {

  }

  @HostListener("window:scroll", ['$event'])
  onWindowScroll(e: Event) {
    let goTop = this.elementRef.nativeElement.querySelectorAll(".go-top");
    if (goTop.length > 0) {
      let display = this.document.documentElement.scrollTop >= 200 || this.document.body.scrollTop >= 200 ? 'block' : 'none'
      this.renderer.setStyle(goTop[0], 'display', display);
    }
  }

  goTop() {
    let scrollStep = -window.scrollY / (300 / 15),
      scrollInterval = setInterval(() => {
        if (window.scrollY != 0) {
          window.scrollBy(0, scrollStep);
        }
        else {
          clearInterval(scrollInterval);
        };
      }, 15);
  }

  isLogin() {
    document.body.scrollTop = 0;
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

  }

}
