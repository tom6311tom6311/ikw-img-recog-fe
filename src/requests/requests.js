import fetch from 'node-fetch';
import AppConfig from '../const/AppConfig';

const requests = {
  detection: ({ top, left, width, height }) => {
    const url = new URL(`http://${AppConfig.server.host}:${AppConfig.server.port}/detection`);
    const params = { top, left, width, height };
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    return fetch(url);
  }
};

export default requests;
