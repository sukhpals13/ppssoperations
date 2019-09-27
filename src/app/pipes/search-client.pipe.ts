import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterdata'
  })

export class SearchClientPipe implements PipeTransform {
    transform(items: any[], value: string): any[] {
        if (!items) return [];
        if (!value) return  items;
        if (value == '' || value == null) return [];
        console.log('Valueeee',value)
        return items.filter(e => e.name && (e.name).toLowerCase().includes(value.toLowerCase()));
      }
}
