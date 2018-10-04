import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../../core/services/firebase.service';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit() {
    console.log('IssuesComponent');

  }

}
