# Smart Rooster SDK

## URL's

1. PRE: `https://preback.smartroosterbureau.us`
1. PRO: `https://back.smartroosterbureau.us`

## Init

```ts
this.sm = new SmartRoosterApi({
  private_key: 'your-token',
  public_key: 'your-token',
  url: 'url-api',
});
```

## Functions

| Function               | parameters        | code    | description                             |
| ---------------------- | ----------------- | ------- | --------------------------------------- |
| getAccess              |                   | 200,500 | Verificar acceso                        |
| getSale                | IConfigSAle       | 200,500 | Listado de ejemplares en venta          |
| getSaleDetails         | IConfigApiDetails | 200,500 | Detalle del ejemplar en venta por uid   |
| getPublic              | IConfigPublic     | 200,500 | Listado de ejemplares publicos para web |
| getPublicDetails       | IConfigApiDetails | 200,500 | Detalle del ejemplar publico por uid    |
| getCategoriesSpecimens |                   | 200,500 | Lista de categorias de ejemplares       |
| reservedSpecimen       | IReservedSpecimen | 200,500 | Reservar un ejemplar en venta por uid   |

## Interfaces

### Parameters

```ts
export interface IConfigSAle {
  perpage: number;
  page: number;
}
export interface IConfigPublic {
  perpage: number;
  page: number;
  category_id: number;
}
export interface IConfigApiDetails {
  specimen_id: string;
}
export interface IReservedSpecimen {
  specimen_id: string;
}
```

## Example NEST

```ts
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { SmartRoosterApi } from 'smart-rooster';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private sm: SmartRoosterApi
  ) {
    this.sm = new SmartRoosterApi({
      private_key: 'your-token',
      public_key: 'your-token',
      url: 'url-api',
    });
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/get-access')
  getAccess() {
    return this.sm.getAccess();
  }

  @Get('/get-categories-specimens')
  getCategoriesSpecimens() {
    return this.sm.getCategoriesSpecimens();
  }

  @Get('/get-public')
  getPublic() {
    return this.sm.getPublic({
      category_id: 1,
      page: 1,
      perpage: 10,
    });
  }

  @Get('/get-public-details')
  getPublicDetails() {
    return this.sm.getPublicDetails({
      specimen_id: 'b0783efd-b7b5-11ed-8ba5-166fd1880ae7',
    });
  }

  @Get('/get-sale')
  getSale() {
    return this.sm.getSale({
      page: 1,
      perpage: 10,
    });
  }

  @Get('/get-sale-details')
  getSaleDetails() {
    return this.sm.getSaleDetails({
      specimen_id: 'b0783efd-b7b5-11ed-8ba5-166fd1880ae7',
    });
  }

  @Get('/reserved-specimen')
  reservedSpecimen() {
    return this.sm.reservedSpecimen({
      specimen_id: 'b0783efd-b7b5-11ed-8ba5-166fd1880ae7',
      status_id: 3,
    });
  }
}
```

### Repo

```
https://github.com/jacksari/nest-sm-example
```
