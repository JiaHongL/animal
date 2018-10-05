import { CodeList } from '../../../models/code-list';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../../core/services/firebase.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  codeList = CodeList;
  feedbackForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private firebaseService: FirebaseService
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
      historyArray[0]['controls'].createUser.patchValue(userName);
    });
    this.feedbackForm.controls.createTime.valueChanges.subscribe((userName) => {
      let historyArray = this.feedbackForm.controls.history['controls'];
      historyArray[0]['controls'].createTime.patchValue(userName);
    });
  }

  postFeedback() {
    this.feedbackForm.controls.createTime.setValue(new Date());
    // this.firebaseService.postFeedback(this.feedbackForm.value).then(()=>{
    //   console.log('ok');
    // }).catch((error)=>{
    //   alert(error);
    // });
    this.firebaseService.postFeedback(this.feedbackForm.value).subscribe((v)=>{
      console.log(v);
    })
  }

  ngOnInit() {

  }

}
