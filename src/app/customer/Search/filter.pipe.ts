import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(products: any[], searchText?: any) {
    if (!products) return [];

    if (!searchText) return products;

    return this.searchItems(products, searchText.toLowerCase());
  }

  private searchItems(products: any[], searchText: any): any[] {
    let results: any[] = [];
    products.forEach(it => {
      if (it.itemName.toLowerCase().includes(searchText)) {
        results.push(it);
      } else {
        let searchResults = this.searchItems(it.price, searchText);
        if (searchResults.length > 0) {
          results.push({
            title: it.itemName,
            price: searchResults
          });
        }
      }
    });
    return results;
  }
}
