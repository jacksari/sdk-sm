import axios, { AxiosError } from 'axios';
import './interfaces/index';
import { IConfigSmartRooster } from './interfaces/index';

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

export class SmartRoosterApi {
  constructor(private readonly config: IConfigSmartRooster) {}

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
          'PRIVATE-KEY': this.config.private_key,
          'PUBLIC-KEY': this.config.public_key,
        },
      });
      return data;
    } catch (error) {
      const err = error as AxiosError;

      return {
        data: [],
        message:
          err.response?.status == 401 ? 'Token incorrecto' : err.response?.data,
        success: false,
        status: false,
      };
    }
  }

  async getSale(body: IConfigSAle) {
    if (!this.existToken()) {
      return {
        ok: false,
        message: 'Sin token',
      };
    }

    try {
      const { data } = await axios.get(
        `${this.config.url}/service/sale?page=${body.page}&perpage=${body.perpage}`,
        {
          headers: {
            'PRIVATE-KEY': this.config.private_key,
            'PUBLIC-KEY': this.config.public_key,
          },
        }
      );
      return data;
    } catch (error) {
      const err = error as AxiosError;

      return {
        data: [],
        message:
          err.response?.status == 401 ? 'Token incorrecto' : err.response?.data,
        success: false,
        status: false,
      };
    }
  }

  async getSaleDetails(body: IConfigApiDetails) {
    if (!this.existToken()) {
      return {
        ok: false,
        message: 'Sin token',
      };
    }

    try {
      const { data } = await axios.get(
        `${this.config.url}/service/sale/details/${body.specimen_id}`,
        {
          headers: {
            'PRIVATE-KEY': this.config.private_key,
            'PUBLIC-KEY': this.config.public_key,
          },
        }
      );
      return data;
    } catch (error) {
      const err = error as AxiosError;

      return {
        data: [],
        message:
          err.response?.status == 401 ? 'Token incorrecto' : err.response?.data,
        success: false,
        status: false,
      };
    }
  }

  async getPublic(body: IConfigPublic) {
    if (!this.existToken()) {
      return {
        ok: false,
        message: 'Sin token',
      };
    }

    try {
      const { data } = await axios.get(
        `${this.config.url}/service/public/${body.category_id}?page=${body.page}&perpage=${body.perpage}`,
        {
          headers: {
            'PRIVATE-KEY': this.config.private_key,
            'PUBLIC-KEY': this.config.public_key,
          },
        }
      );
      return data;
    } catch (error) {
      const err = error as AxiosError;

      return {
        data: [],
        message:
          err.response?.status == 401 ? 'Token incorrecto' : err.response?.data,
        success: false,
        status: false,
      };
    }
  }

  async getPublicDetails(body: IConfigApiDetails) {
    if (!this.existToken()) {
      return {
        ok: false,
        message: 'Sin token',
      };
    }

    try {
      const { data } = await axios.get(
        `${this.config.url}/service/public/details/${body.specimen_id}`,
        {
          headers: {
            'PRIVATE-KEY': this.config.private_key,
            'PUBLIC-KEY': this.config.public_key,
          },
        }
      );
      return data;
    } catch (error) {
      const err = error as AxiosError;

      return {
        data: [],
        message:
          err.response?.status == 401 ? 'Token incorrecto' : err.response?.data,
        success: false,
        status: false,
      };
    }
  }

  async getCategoriesSpecimens() {
    if (!this.existToken()) {
      return {
        ok: false,
        message: 'Sin token',
      };
    }

    try {
      const { data } = await axios.get(
        `${this.config.url}/service/public/get-categories`,
        {
          headers: {
            'PRIVATE-KEY': this.config.private_key,
            'PUBLIC-KEY': this.config.public_key,
          },
        }
      );
      return data;
    } catch (error) {
      const err = error as AxiosError;

      return {
        data: [],
        message:
          err.response?.status == 401 ? 'Token incorrecto' : err.response?.data,
        success: false,
        status: false,
      };
    }
  }

  async reservedSpecimen(body: IReservedSpecimen) {
    if (!this.existToken()) {
      return {
        ok: false,
        message: 'Sin token',
      };
    }

    try {
      const { data } = await axios.put(
        `${this.config.url}/service/sale/update-reservated/${body.specimen_id}`,
        {},
        {
          headers: {
            'PRIVATE-KEY': this.config.private_key,
            'PUBLIC-KEY': this.config.public_key,
          },
        }
      );
      return data;
    } catch (error) {
      const err = error as AxiosError;

      return {
        data: [],
        message:
          err.response?.status == 401 ? 'Token incorrecto' : err.response?.data,
        success: false,
        status: false,
      };
    }
  }
}
