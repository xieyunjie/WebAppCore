import * as service from '@/services/mailcenter/mailsendend'; 


const model = {

  namespace: 'mailcenter_mailsendend',

  state: {
    MailSendEndList: []
  },
  effects: {

    * Init({
      payload
    }, {
      put,
      call,
      select
    }) {
      const data = yield call(service.GetMailSendEndList, {});
      return yield put({
        type: 'save',
        payload: {
          MailSendEndList: data
        }
      });
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload
      };
    },
  }

}

export default model;