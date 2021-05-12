// tslint:disable
import {ResponseProduct} from '../src/app/modules/products/model/responseProduct';

export class TestUtil {

  public static getResponseProduct(pageNumber: number, pageSize: number): ResponseProduct[] {
    return [
      {
        content: {
          product: this.getProducts(pageSize)
        },
        pageable: {
          pageNumber: pageNumber,
          pageSize: pageSize
        },
        totalElements: pageSize,
        totalPages: 1
      }
    ];
  }

  public static getProduct() {
    return this.getProducts(1);
  }

  private static getProducts(elements: number) {
    const prods = [
      {
        productId: 1,
        sku: '111',
        name: 'God of War 4',
        description: `To jest test opisu gry. To jest test opisu gry. To jest test opisu gry. `,
        unitPrice: 49.99,
        productImage: `imageUrl`,
        active: true,
        unitsInStock: 5,
        dateTimeCreated: new Date(),
        dateTimeUpdated: new Date(),
        productCategoryId: 2
      },
      {
        productId: 3,
        sku: '333',
        name: 'Ghost Of Tsushima',
        description: `To jest test opisu gry. To jest test opisu gry. To jest test opisu gry. `,
        unitPrice: 249.99,
        productImage: `imageUrl`,
        active: true,
        unitsInStock: 50,
        dateTimeCreated: new Date(),
        dateTimeUpdated: new Date(),
        productCategoryId: 2
      },
      {
        productId: 4,
        sku: '444',
        name: 'Mortal Kombat',
        description: `To jest test opisu gry. To jest test opisu gry. To jest test opisu gry. `,
        unitPrice: 49.99,
        productImage: `imageUrl`,
        active: true,
        unitsInStock: 30,
        dateTimeCreated: new Date(),
        dateTimeUpdated: new Date(),
        productCategoryId: 2
      }
    ];

    return prods.slice(0, elements);
  }
}
