import HttpRequest from '@/libs/axios';
import layer from 'layer-mobile';

const handleError = (err) => {
  layer.open({
    content: err,
    time: 1.4,
    skin: 'msg'
  });
};

const get = ({ url, data }) => {
  return new Promise((resolve) => {
    HttpRequest.get(url, {
      params: data
    }).then(res => {
      resolve(res);
    }).catch(err => {
      handleError(err);
    });
  });
};

const post = ({ url, data }) => {
  return new Promise((resolve) => {
    HttpRequest.post(url, data).then(res => {
      resolve(res);
    }).catch(err => {
      handleError(err);
    });
  });
};

const request = ({ methods, url, data }) => {
  if (methods.toLowerCase() === 'post') {
    return post({
      url,
      data
    });
  } else {
    return get({
      url,
      data
    });
  }
};

export default {
  request,
  get,
  post
};
