import {appInfo} from '../constants/appInfos';
import axiosClient from './axiosClient';

class NotiAPI {
  HandleNoti = async (url, data, method = 'get') => {
    return await axiosClient(`${appInfo.BASE_URL}/v1/notification${url}`, {
      method,
      data,
    });
  };
}

const notiAPI = new NotiAPI();
export default notiAPI;
