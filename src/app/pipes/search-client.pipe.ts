import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterdata'
  })

export class SearchClientPipe implements PipeTransform {
    transform(items: any[], value: string): any[] {
        if (!items) return [];
        if (!value) return  items;
        if (value == '' || value == null) return [];
        return items.filter(e => (e.name).toLowerCase().includes(value.toLowerCase()));
      }
}
