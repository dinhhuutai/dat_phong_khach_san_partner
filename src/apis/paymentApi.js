import {appInfo} from '../constants/appInfos';
import axiosClient from './axiosClient';

class PaymentAPI {
  HandlePayment = async (url, data, method = 'get') => {
    return await axiosClient(`${appInfo.BASE_URL}/v1/payment${url}`, {
      method,
      data,
    });
  };
}

const paymentAPI = new PaymentAPI();
export default paymentAPI;
