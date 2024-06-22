import {appInfo} from '../constants/appInfos';
import axiosClient from './axiosClient';

class UserAPI {
  HandleUser = async (url, data, method = 'get') => {
    return await axiosClient(`${appInfo.BASE_URL}/v1/user${url}`, {
      method,
      data,
    });
  };
}

const userAPI = new UserAPI();
export default userAPI;
