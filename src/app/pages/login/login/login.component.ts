import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../../core/services/firebase.service';
import { Router } from '@angular/router';
import { LoadingService } from '../../../feature/loading/loading.service';
import { LoadingDirective } from '../../../feature/loading/loading.directive';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hasError = false;
  loginForm: FormGroup;

  @ViewChild(LoadingDirective) componentHost: LoadingDirective;

  constructor(
    private fb: FormBuilder,
    public afAuth: AngularFireAuth,
    private firebaseService: FirebaseService,
    private router: Router,
    private loadingService: LoadingService,
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    this.loadingService.creatComponent(this.componentHost.viewContainerRef, 'loading03');
    this.hasError = false;
    this.firebaseService.login(this.loginForm.value.email, this.loginForm.value.password)
      .then((user) => {
        this.hasError = false;
        this.router.navigate(['issues']);
        this.loadingService.onDestroy();
      }).catch((error) => {
        this.hasError = true;
        this.loadingService.onDestroy();
      });
  }

  ngOnInit() {
    this.firebaseService.isLogin().subscribe(isLogin => {
      this.loadingService.creatComponent(this.componentHost.viewContainerRef, 'loading03');
      if (isLogin) {
        setTimeout(() => {
          this.router.navigate(['issues']);
          this.loadingService.onDestroy();
        },800);
      }else{
        this.loadingService.onDestroy();
      }
    });
  }

}
