import fetch from 'dva/fetch';
import {
  notification
} from 'antd';
import qs from 'querystring';


const setUrlEncoded = obj => {
  let urlEncoded = '';
  if (obj && obj instanceof Object) {
    urlEncoded = qs.stringify(obj)
    // const keys = Object.keys(obj);
    // if (keys && keys.length) {
    //   keys.forEach((key, index) => {
    //     urlEncoded += `${key}=${obj[key]}`;
    //     if (index + 1 < keys.length) {
    //       urlEncoded += '&';
    //     }
    //   });
    // }
  }
  return urlEncoded;
};

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const errorText = codeMessage[response.status] || response.statusText;
  //Toast.fail(errorText, 1);
  notification.error({
    message: `请求错误 ${response.status}: ${response.url}`,
    description: errorText,
  });
  const error = new Error(errorText);
  error.code = response.status;
  // error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
function request(url, options) {
  const defaultOptions = {};
  const newOptions = {
    method: 'GET',
    ...defaultOptions,
    ...options
  }; 

  if (
    newOptions.method === 'POST' ||
    newOptions.method === 'PUT' ||
    newOptions.method === 'DELETE'
  ) {
    if (newOptions.requestType === 'json') {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...newOptions.headers,
      };
      newOptions.body = JSON.stringify(newOptions.data);
    }
    else if (newOptions.requestType === 'formData') {
    }
    else {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        ...newOptions.headers,
      }; 
      if (newOptions.data != undefined) {

        newOptions.body = setUrlEncoded(newOptions.data);
      }
    } 
  }
  else if (newOptions.method === 'GET') {

    if (newOptions.data != undefined)
    {
      url = url + '?' + setUrlEncoded(newOptions.data);
    } 
  }  
  return fetch(url, newOptions)
    .then(checkStatus)
    .then(response => {
      return response.json(); // 返回响
    });
}

/**
 *  the proxy of request
 * @param url
 * @param options
 * @returns {*}
 */
function proxyRequest(url, options, showmsg = false) {
  options = options || {};

  //Toast.loading(null, 60);
  return request(url, options)
    .then(resData => {
      return resData;
    })
    .catch((e, url) => {
      //console.log(e,'errrr')
      const status = e.code;
      if (status === 401) {
        return;
      } else if (status === 403) {
        // router.push('/login');
        return;
      } else if (status <= 504 && status >= 500) {
        // router.push('/login');
        return;
      } else if (status >= 404 && status < 422) {
        // router.push('/404');
        return;
      }
    });
}

// Mix 请求去除所有提示，用于合并请求使用
function proxyMixRequest(url, options) {
  options = options || {};

  return request(url, options)
    .then(resData => {
      if (resData.success === true) {
        return resData || {};
      }
      const e = new Error();
      e.code = 9000;
      e.message = resData.exMessage;
      throw e;
    })
    .catch((e, url) => {
      //console.log(e,'errrr') 
      return;
    });
}
proxyRequest.mix = (url, data, method, options) => {
  options = options || {};
  options.body = data || {};
  options.method = method;
  return proxyMixRequest(url, options);
};

proxyRequest.get = (url, data, options, showmsg) => {
  options = options || {};
  options.body = data || {};
  options.method = 'GET';
  return proxyRequest(url, options, showmsg);
};

proxyRequest.post = (url, data, options, showmsg) => {
  options = options || {};
  options.body = data || {};
  options.method = 'POST';
  return proxyRequest(url, options, showmsg);
};

proxyRequest.put = (url, data, options) => {
  options = options || {};
  options.body = data || {};
  options.method = 'PUT';
  return proxyRequest(url, options);
};

proxyRequest.delete = (url, data, options) => {
  options = options || {};
  options.body = data || {};
  options.method = 'DELETE';
  return proxyRequest(url, options);
};

export default request;
