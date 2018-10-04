import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs/internal/operators/filter';
import { map } from 'rxjs/internal/operators/map';
import { mergeMap } from 'rxjs/internal/operators/mergeMap';
import { FirebaseService } from './core/services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit {
  isUserLogin = false;
  isOpenMenu = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private firebaseService:FirebaseService
  ) {

  }

  goTop() {
    document.body.scrollTop = 0;
  }

  isLogin(){
    this.firebaseService.isLogin().subscribe(isLogin => {
      this.isUserLogin = isLogin;
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
      .subscribe((event) => this.titleService.setTitle(event['title']));
  }

  ngAfterViewInit() {
    window.onscroll = function () {
      var goTop = document.querySelectorAll(".go-top") as NodeListOf<HTMLElement>;
      if (goTop.length > 0) {
        goTop[0].style.display = document.documentElement.scrollTop >= 200 || document.body.scrollTop >= 200 ? 'block' : 'none';
        goTop[0].onclick = function () {
          var scrollStep = -window.scrollY / (300 / 15),
            scrollInterval = setInterval(() => {
              if (window.scrollY != 0) {
                window.scrollBy(0, scrollStep);
              }
              else clearInterval(scrollInterval);
            }, 15);
        }
      }
    }
  }


}
