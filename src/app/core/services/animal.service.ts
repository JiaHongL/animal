import { Injectable, PipeTransform } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { Observable, of, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Animal } from '../../models/animal';
import { UtilService } from './util.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  favoriteChangeSubject$ = new Subject();
  searchNoticeSubject$ = new Subject();

  constructor(
    private http: HttpClient,
    private utilService: UtilService
  ) {

  }

  getAnimalDetail(id: string): Observable<Animal[]> {
    return this.http.get<Animal[]>('https://animal-proxy-api.herokuapp.com/index.php?&animal_id=' + id)
      .pipe(
        catchError(this.handleError('getAnimalDetail', []))
      );
  }

  getAnimals(page: number, params): Observable<Animal[]> {
    let Top = 80;
    if (this.utilService.isMobile()) { Top = 30; };
    let SkipCount = Top * (page - 1);
    let Params = params;
    return this.http.get<Animal[]>('https://animal-proxy-api.herokuapp.com/index.php?&$top=' + Top + '&$skip=' + SkipCount + Params)
      .pipe(
        // tap(animals => console.log(animals)),
        tap(animals => this.addIsLikeProperty(animals)),
        tap(animals => this.setIsLikeProperty(animals)),
        catchError(this.handleError('getAnimals', []))
      );
  }

  addIsLikeProperty(animals: Animal[]) {
    let NewAnimals = animals.map(animal => {
      animal.isLike = false;
    });
    return NewAnimals;
  }

  setIsLikeProperty(animals: Animal[]) {
    let FavoriteList = JSON.parse(window.localStorage.getItem("FavoriteList")) || [];
    let SubIdList = FavoriteList.map(v => v.animal_subid);
    let NewAnimals = animals.map(animal => {
      if (SubIdList.indexOf(animal.animal_subid) > -1) {
        animal.isLike = true;
      }
    });
    return NewAnimals;
  }

  setFavorite(item: Animal) {
    let FavoriteList = JSON.parse(window.localStorage.getItem("FavoriteList")) || [];
    if (item.isLike) {
      FavoriteList.push(item);
    } else {
      FavoriteList = FavoriteList.filter((v) => {
        return v.animal_subid !== item.animal_subid
      });
    };
    window.localStorage.setItem("FavoriteList", JSON.stringify(FavoriteList));
    this.favoriteChangeSubject$.next('change');
  }

  getFavorite() {
    let FavoriteList = JSON.parse(window.localStorage.getItem("FavoriteList")) || [];
    return FavoriteList;
  }

  getFavoriteChange() {
    return this.favoriteChangeSubject$.asObservable();
  }

  getSearchNotice() {
    return this.searchNoticeSubject$.asObservable();
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      // console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}

