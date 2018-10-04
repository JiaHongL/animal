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
    this.searchBreadcrumb = '';
    if (Object.keys(queryParams).length > 0) {
      Object.keys(queryParams).forEach((objectKey, index) => {
        let type = objectKey;
        let value = queryParams[objectKey];

        switch (type) {
          case 'animal_kind':
            this.searchBreadcrumb += '' + value;
            break;
          case 'animal_sex':
            this.searchBreadcrumb += ', ' + this.filterList('SexList', value);
            break;
          case 'animal_bodytype':
            this.searchBreadcrumb += ', ' + this.filterList('BodyTypeList', value);
            break;
          case 'animal_age':
            this.searchBreadcrumb += ', ' + this.filterList('AgeList', value);
            break;
          case 'animal_colour':
            this.searchBreadcrumb += ', ' + value;
            break;
          case 'animal_sterilization':
            this.searchBreadcrumb += ' , 是否絕育：' + this.filterList('SterilizationList', value);;
            break;
          case 'animal_bacterin':
            this.searchBreadcrumb += ' , 是否施打狂犬病：' + this.filterList('BacterinList', value);;
            break;
          case 'animal_area_pkid':
            this.searchBreadcrumb += this.filterList('AreaList', value);
            break;
          case 'animal_shelter_pkid':
            this.searchBreadcrumb += this.filterList('ShelterList', value);
            break;
          default:
            this.searchBreadcrumb = '';
            break;
        }
      });
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
        tap((v) => this.setSearchBreadcrumb(v)),
        mergeMap((route) => route.data),
      )
      .subscribe((event) => this.pageTitle = event.title);
  }

}
