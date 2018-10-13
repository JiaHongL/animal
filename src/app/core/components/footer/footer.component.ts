import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { mergeMap, filter, map, tap } from 'rxjs/operators';
import { CodeList } from '../../../models/code-list';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  host: {
    'class': 'footer'
  }
})
export class FooterComponent implements OnInit {
  pageTitle = '';
  searchBreadcrumb = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

  }

  setSearchBreadcrumb(route) {
    let queryParams = route.snapshot.queryParams;
    let breadcrumb = [];
    if (Object.keys(queryParams).length > 0) {
      Object.keys(queryParams).forEach((objectKey, index) => {
        let type = objectKey;
        let value = queryParams[objectKey];
        switch (type) {
          case 'animal_id':
            breadcrumb.push(value);
            break;
          case 'animal_subid':
            breadcrumb.push(value);
            break;
          case 'animal_kind':
            breadcrumb.push(value);
            break;
          case 'animal_sex':
            breadcrumb.push(this.filterList('SexList', value));
            break;
          case 'animal_bodytype':
            breadcrumb.push(this.filterList('BodyTypeList', value));
            break;
          case 'animal_age':
            breadcrumb.push(this.filterList('AgeList', value));
            break;
          case 'animal_colour':
            breadcrumb.push(value);
            break;
          case 'animal_sterilization':
            breadcrumb.push('是否絕育：' + this.filterList('SterilizationList', value));
            break;
          case 'animal_bacterin':
            breadcrumb.push('是否施打狂犬病：' + this.filterList('BacterinList', value));
            break;
          case 'animal_area_pkid':
            breadcrumb.push(this.filterList('AreaList', value));
            break;
          case 'animal_shelter_pkid':
            breadcrumb.push(this.filterList('ShelterList', value));
            break;
          default:
            this.searchBreadcrumb = '';
            break;
        }
        this.searchBreadcrumb = breadcrumb.join(", ");
      });
    }
  }

  setIdBreadcrumb(route) {
    if (route.snapshot.params.id) {
      this.searchBreadcrumb = route.snapshot.params.id;
    }
  }

  filterList(ListName, originalData) {
    let filterData = CodeList[ListName].filter(v => v.key == originalData);
    let transformData = filterData.length > 0 ? filterData[0].value : originalData;
    return transformData;
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
        tap(() => { this.searchBreadcrumb = '' }),
        tap((v) => this.setSearchBreadcrumb(v)),
        tap((v) => this.setIdBreadcrumb(v)),
        mergeMap((route) => route.data),
      )
      .subscribe((event) => this.pageTitle = event.title);
  }

}
