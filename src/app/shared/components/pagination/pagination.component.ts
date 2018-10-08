import { Component, OnInit, Input, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  _totalItems = 0;
  _itemsPerPage = 10;
  currentPage = 0;
  showMinPage = 1;
  showMaxPage = 5;

  pageUnit = 0;
  pages = [];

  get totalItems() {
    return this._totalItems;
  }
  @Input('total-items')
  set totalItems(total) {
    this._totalItems = total;
    this.setPages(this._totalItems, this._itemsPerPage);
  }

  get itemsPerPage() {
    return this._itemsPerPage;
  }
  @Input('items-per-page')
  set itemsPerPage(count) {
    this._itemsPerPage = count;
  }

  @Output('set-page') setPage = new EventEmitter<number>();


  constructor(
    private changeDetectorRef:ChangeDetectorRef
  ) { }

  setPages(totalItems, itemsPerPage) {
    this.pageUnit = 0;
    this.pages = [];
    this.currentPage = 0;
    this.showMinPage = 0;
    this.showMaxPage = 0;
    if (totalItems > 1) {
      this.currentPage = 1;
      this.setShowMinMaxPage();
    };
    let count = Math.floor(this._totalItems / this._itemsPerPage);
    if ((this._totalItems % this._itemsPerPage) > 0) {
      count += 1;
    };
    for (let i = 0; i < count; i++) {
      this.pages.push({
        key: i,
        value: i + 1
      });
    };
  }


  setShowMinMaxPage() {
    this.showMinPage = 1 + ((this.pageUnit) * 5);
    this.showMaxPage = 5 * ((this.pageUnit) + 1);
  }

  canShowPage(value) {
    return (this.showMinPage <= value && value <= this.showMaxPage);
  }
  
  setCurrentPage(v){
    this.currentPage = v;
    if (this.currentPage > this.showMaxPage) {
      this.pageUnit += 1;
    } else if (this.currentPage < this.showMinPage) {
      this.pageUnit -= 1;
    };
    this.setShowMinMaxPage();
    this.setPage.emit(this.currentPage);
  }

  incrementCurrentPage(v) {
    this.currentPage += v;
    if (this.currentPage > this.pages.length) {
      this.currentPage = this.pages.length;
    };
    if(this.currentPage > this.showMaxPage) {
      this.pageUnit = this.pageUnit + 1;
    };
    this.setShowMinMaxPage();
    this.setPage.emit(this.currentPage);
  }

  decrementCurrentPage(v) {
    this.currentPage -= v;
    if (this.currentPage <= 0) {
      this.currentPage = 1;
      this.pageUnit = 0;
    };
    if(this.currentPage < this.showMinPage) {
      this.pageUnit = this.pageUnit - 1;
    };
    this.setShowMinMaxPage();
    this.setPage.emit(this.currentPage);
  }

  ngOnInit() {
  }

}
