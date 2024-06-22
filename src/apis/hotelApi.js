import {appInfo} from '../constants/appInfos';
import axiosClient from './axiosClient';

class HotelAPI {
  HandleHotel = async (url, data, method = 'get') => {
    return await axiosClient(`${appInfo.BASE_URL}/v1/hotel${url}`, {
      method,
      data,
    });
  };
}

const hotelAPI = new HotelAPI();
export default hotelAPI;
