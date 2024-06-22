import {appInfo} from '../constants/appInfos';
import axiosClient from './axiosClient';

class UtilHotelAPI {
  HandleUtilHotel = async (url, data, method = 'get') => {
    return await axiosClient(`${appInfo.BASE_URL}/v1/utilHotel${url}`, {
      method,
      data,
    });
  };
}

const utilHotelAPI = new UtilHotelAPI();
export default utilHotelAPI;
