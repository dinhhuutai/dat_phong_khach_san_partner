import {appInfo} from '../constants/appInfos';
import axiosClient from './axiosClient';

class PageAPI {
  HandlePage = async (url, data, method = 'get') => {
    return await axiosClient(`${appInfo.BASE_URL}/v1/page${url}`, {
      method,
      data,
    });
  };
}

const pageAPI = new PageAPI();
export default pageAPI;
