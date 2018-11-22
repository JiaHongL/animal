import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { Observable, of, Subject } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Animal } from '../../models/animal';
import { UtilService } from './util.service';
import { environment } from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AnimalService {
  favoriteChangeSubject$ = new Subject();

  constructor(
    private http: HttpClient,
    private utilService: UtilService
  ) {

  }

  getAnimalDetail(id: string): Observable<Animal[]> {
    return this.http.get<Animal[]>(environment.api.path + '?&animal_id=' + id)
      .pipe(
        catchError(this.handleError('getAnimalDetail', []))
      );
  }

  getAnimals(page: number, params): Observable<Animal[]> {
    let Top = 80;
    if (this.utilService.isMobile()) { Top = 30; };
    let SkipCount = Top * (page - 1);
    let Params = params;
    return this.http.get<Animal[]>(environment.api.path + '?&$top=' + Top + '&$skip=' + SkipCount + Params)
      .pipe(
        map((animals:Animal[]) => {
          animals.forEach(animal => {
            new Animal(animal);
          });
          return animals;
        }),
        catchError(this.handleError('getAnimals', []))
      );
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

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      // console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}

