import { CodeList } from '../../../models/code-list';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../../core/services/firebase.service';
import { LoadingDirective } from '../../../feature/loading/loading.directive';
import { LoadingService } from '../../../feature/loading/loading.service';
import { UtilService } from '../../../core/services/util.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit, OnDestroy {
  resetNoticeSubscription: Subscription;
  isPost = false;
  codeList = CodeList;
  feedbackForm: FormGroup;
  @ViewChild(LoadingDirective) componentHost: LoadingDirective;

  constructor(
    private fb: FormBuilder,
    private firebaseService: FirebaseService,
    private loadingService: LoadingService
  ) {
    this.feedbackForm = this.fb.group({
      id: ['', ''],
      status: [0, ''],
      type: [1, Validators.required],
      title: ['', Validators.required],
      createTime: ['', ''],
      createUser: ['', Validators.required],
      comment: ['', Validators.required],
      email: ['', Validators.email],
      history: this.fb.array([
        this.fb.group({
          status: [0, ''],
          createTime: ['', ''],
          createUser: ['', ''],
          remark: ['使用者提交', '']
        }),
      ])
    });
    this.feedbackForm.controls.createUser.valueChanges.subscribe((userName) => {
      let historyArray = this.feedbackForm.controls.history['controls'];
      historyArray[0].patchValue({
        createUser: userName
      });
    });
    this.feedbackForm.controls.createTime.valueChanges.subscribe((createTime) => {
      let historyArray = this.feedbackForm.controls.history['controls'];
      historyArray[0].patchValue({
        createTime: createTime
      });
    });
  }

  postFeedback() {
    this.loadingService.creatComponent(this.componentHost.viewContainerRef, 'loading03');
    this.feedbackForm.controls.createTime.setValue(new Date());
    this.firebaseService.postFeedback(this.feedbackForm.value).subscribe((v) => {
      setTimeout(() => {
        this.isPost = true;
        this.loadingService.onDestroy();
      }, 600);
    });
  }

  ngOnInit() {
    this.resetNoticeSubscription = this.firebaseService.getResetFeedbackFormNotice()
      .subscribe((v) => {
        this.isPost = false;
        this.feedbackForm.reset();
        this.feedbackForm.setValue({
          id: '',
          status: 0,
          type: 1,
          title: '',
          createTime: '',
          createUser: '',
          comment: '',
          email: '',
          history: [{
            status: 0,
            createTime: '',
            createUser: '',
            remark: '使用者提交',
          }]
        });
      });
  }

  ngOnDestroy() {
    this.resetNoticeSubscription.unsubscribe();
  }

}
