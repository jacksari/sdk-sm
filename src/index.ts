import axios, { AxiosError } from 'axios';
import './interfaces/index';
import { IConfigSmartRooster } from './interfaces/index';

export interface IConfigApi {
  perpage: number;
  page: number;
  category_id?: number;
}

export class SmartRoosterApi {
  constructor(private readonly config: IConfigSmartRooster) {
    config.url = config.production
      ? 'https://back.smartroosterbureau.us'
      : // : 'https://preback.smartroosterbureau.us/';
        'http://192.168.1.14:9000';
    // console.log('init', config);
  }

  existToken() {
    if (this.config.private_key && this.config.public_key) {
      return true;
    } else {
      return false;
    }
  }

  async getAccess() {
    if (!this.existToken()) {
      return {
        ok: false,
        message: 'Sin token',
      };
    }

    try {
      const { data } = await axios(`${this.config.url}/service/access`, {
        headers: {
          private_key: this.config.private_key,
          public_key: this.config.public_key,
        },
      });
      return data;
    } catch (error) {
      const err = error as AxiosError;

      return {
        data: [],
        message:
          err.response?.status == 401 ? 'Token incorrecto' : 'Algo fallo',
        success: false,
        status: false,
      };
    }
  }

  async getSale(body: IConfigApi) {
    if (!this.existToken()) {
      return {
        ok: false,
        message: 'Sin token',
      };
    }

    try {
      const { data } = await axios(
        `${this.config.url}/service/sale`,
        {
          ...body,
        },
        {
          headers: {
            private_key: this.config.private_key,
            public_key: this.config.public_key,
          },
        }
      );
      return data;
    } catch (error) {
      const err = error as AxiosError;

      return {
        data: [],
        message:
          err.response?.status == 401 ? 'Token incorrecto' : 'Algo fallo',
        success: false,
        status: false,
      };
    }
  }
}

// Route::group(['middleware' => ['key-client']], function () {
//   Route::get('/access', function () {
//       return response()->json(["message" => "Authorized"], 200);
//   });
//   Route::prefix('sale')->group(function () {
//       Route::get('/', [SpecimensServiceController::class, 'getSpecimensSale']);
//       Route::get('/details/{specimen_id}', [SpecimensServiceController::class, 'getSpecimenSaleDetails']);
//   });
//   Route::prefix('public')->group(function () {
//       Route::get('/{category_id}', [SpecimensServiceController::class, 'getSpecimensPublic']);
//       Route::get('/get-categories', [SpecimensServiceController::class, 'getCategoriesSpecimens']);
//       Route::get('/details/{uuid}', [SpecimensServiceController::class, 'getSpecimenPublicDetails']);
//   });
// });
