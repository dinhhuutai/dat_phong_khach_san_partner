import {appInfo} from '../constants/appInfos';
import axiosClient from './axiosClient';

class AddressAPI {
  HandleProvince = async (url, data, method = 'get') => {
    return await axiosClient(`${appInfo.BASE_URL}/v1/province${url}`, {
      method,
      data,
    });
  };

  HandleDistrict = async (url, data, method = 'get') => {
    return await axiosClient(`${appInfo.BASE_URL}/v1/district${url}`, {
      method,
      data,
    });
  };

  HandleCommune = async (url, data, method = 'get') => {
    return await axiosClient(`${appInfo.BASE_URL}/v1/commune${url}`, {
      method,
      data,
    });
  };
}

const addressAPI = new AddressAPI();
export default addressAPI;
