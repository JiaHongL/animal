import { Pipe, PipeTransform } from '@angular/core';
import { CodeList } from '../../models/code-list';

@Pipe({
  name: 'issues'
})
export class IssuesPipe implements PipeTransform {

  transform(value: any, param?: any): any {
    let type = param;
    let originalData = value;
    let transformData = value;

    switch (type) {
      case 'type':
        transformData = this.filterList('FeedbackTypeList', originalData);
        break;
      case 'status':
        transformData = this.filterList('IssuesStatusList', originalData);
        break;
      default:
        transformData = originalData;
        break;
    }
    return transformData;
  }

  filterList(ListName, originalData) {
    let filterData = CodeList[ListName].filter(v => v.key == originalData);
    let transformData = filterData.length > 0 ? filterData[0].value : originalData;
    return transformData;
  }

}
