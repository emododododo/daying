import request from '../utils/request';
// import qs from 'qs';

export async function query(params) {
  return request(`http://107.170.52.153:4007/api/resources?name=${params.queryName}`);
}
