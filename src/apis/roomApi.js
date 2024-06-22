import {appInfo} from '../constants/appInfos';
import axiosClient from './axiosClient';

class RoomAPI {
  HandleRoom = async (url, data, method = 'get') => {
    return await axiosClient(`${appInfo.BASE_URL}/v1/room${url}`, {
      method,
      data,
    });
  };
}

const roomAPI = new RoomAPI();
export default roomAPI;
