import { Pipe, PipeTransform } from '@angular/core';
import { CodeList } from '../../models/code-list';


@Pipe({
  name: 'animal'
})
export class AnimalPipe implements PipeTransform {

  transform(value: any, param?: any): any {
    let type = param;
    let originalData = value;
    let transformData = value;

    switch (type) {
      case 'sex':
        transformData = this.filterList('SexList', originalData);
        break;
      case 'bodytype':
        transformData = this.filterList('BodyTypeList', originalData);
        break;
      case 'age':
        transformData = this.filterList('AgeList', originalData);
        break;
      case 'area':
        transformData = this.filterList('AreaList', originalData);
        break;
      case 'sterilization':
        transformData = this.filterList('SterilizationList', originalData);
        break;
      case 'bacterin':
        transformData = this.filterList('BacterinList', originalData);
        break;
      case 'status':
        transformData = this.filterList('StatusList', originalData);
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
