import {appInfo} from '../constants/appInfos';
import axiosClient from './axiosClient';

class CommentAPI {
  HandleComment = async (url, data, method = 'get') => {
    return await axiosClient(`${appInfo.BASE_URL}/v1/comment${url}`, {
      method,
      data,
    });
  };
}

const commentAPI = new CommentAPI();
export default commentAPI;
