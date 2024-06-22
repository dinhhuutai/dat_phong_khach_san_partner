import {appInfo} from '../constants/appInfos';
import axiosClient from './axiosClient';

class AuthAPI {
  HandleAuthentication = async (url, data, method = 'get') => {
    return await axiosClient(`${appInfo.BASE_URL}/v1/auth${url}`, {
      method,
      data,
    });
  };
}

const authenticationAPI = new AuthAPI();
export default authenticationAPI;
