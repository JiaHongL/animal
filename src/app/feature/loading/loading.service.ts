import { Injectable, ComponentRef, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { Loading01Component } from './loading01/loading01.component';
import { Loading02Component } from './loading02/loading02.component';
import { Loading03Component } from './loading03/loading03.component';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  currentComponentName: string;
  currentComponentRef: ComponentRef<any>;
  private currentViewContainerRef: ViewContainerRef;
  private components = {
    loading01: Loading01Component,
    loading02: Loading02Component,
    loading03: Loading03Component,
  }

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }
  
  creatComponent(ViewContainerRef: ViewContainerRef, ComponentName: string, Inputs?: Array<object>) {
    this._createComponentFactory(ViewContainerRef, ComponentName, Inputs);
  }

  private _createComponentFactory(ViewContainerRef: ViewContainerRef, ComponentName: string, Inputs?: Array<object>) {
    // 如果已經有component時,先讓 component 做 OnDestroy 的動作.
    if (this.currentComponentRef) { this.onDestroy(); };

    // 1.取得要動態產生 component 的 directive
    this.currentViewContainerRef = ViewContainerRef;
    // 2.準備一個要產生的 component
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.components[ComponentName]);
    // 3.清除 directive 裡的東西
    this.currentViewContainerRef.clear();
    // 4.創建 component 並取得ref
    this.currentComponentRef = this.currentViewContainerRef.createComponent(componentFactory);
    // 5.設定 component 的 Input欄位(初始化賦值)  ex: <app-a [data]="PassData"><app-a>
    if (Inputs) { this._setInputs(Inputs); };

    this.currentComponentName = ComponentName;

  }

  private _setInputs(Inputs: Array<object>) {
    Inputs.forEach((val, index) => {
      let name = val['InputName'], data = val['InputData'];
      this.currentComponentRef.instance[name] = data;
    })
  }

  // 更新Input的值  
  updataInput(InputName: string, InputData: object | string | number) {
    this.currentComponentRef.instance[InputName] = InputData;
  }

  // 回傳 output EventEmitter , 讓父Component做訂閱. ex: <app-a (change)="doSomething()"><app-a>
  getOutput(OutputName: string) {
    return this.currentComponentRef.instance[OutputName];
  }

  // 被創建 Component 的 Destroy
  onDestroy() {
    this.currentComponentRef.destroy();
    this.currentComponentName = '';
  }

  // 清除 view + onDestroy()
  onClear() {
    this.currentViewContainerRef.clear();
    this.onDestroy();
  }

}
