import * as service from '@/services/mailcenter/maillist';

const model = {

  namespace: 'mailcenter_maillist',

  state: {
    MailList: [],
    CMail: {},
    editModalVisible: false,
    EmptyMail: {
      id: 0,
      name: '',
      displayName: '',
      subject: '',
      mailBody: '',
      isHtml: true,
      mailSendTypeId: 1,
      mailSendEndId: 1,
      status: 1,
      mailSendEnd: {},
      mailSendType: {},
      mcMailReceiveEnd: []
    }
  },

  effects: {

    * GetMailList({
      payload
    }, {
      put,
      call,
      select
    }) {
      const data = yield call(service.GetMailList, {});
      return yield put({
        type: 'save',
        payload: {
          MailList: data
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
};

export default model;
