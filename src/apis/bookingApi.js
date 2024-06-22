import {appInfo} from '../constants/appInfos';
import axiosClient from './axiosClient';

class BookingAPI {
  HandleBooking = async (url, data, method = 'get') => {
    return await axiosClient(`${appInfo.BASE_URL}/v1/booking${url}`, {
      method,
      data,
    });
  };
}

const bookingAPI = new BookingAPI();
export default bookingAPI;
