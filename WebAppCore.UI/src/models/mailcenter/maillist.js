import * as service from '@/services/mailcenter/maillist';

const model = {

  namespace: 'mailcenter_maillist',

  state: {
    MailList: [],
    CMail: {},
    editModalVisible: false,
    EmptyMail: {
      Id: 0,
      Name: '',
      DisplayName: '',
      Subject: '',
      MailBody: '',
      IsHtml: true,
      MailSendTypeId: 1,
      MailSendEndId: 1,
      Status: 1,
      MailSendEnd: {},
      MailSendType: {},
      McMailReceiveEnd: []
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
    * SaveMailList({
      payload
    }, {
      put,
      call,
      select
    }) {
      const res = yield call(service.SaveMailList, payload);
      return res;
    },
    * DeleteMailList({
      payload
    }, {
      put,
      call,
      select
    }) {
      const res = yield call(service.DeleteMailList, payload);
      return res;
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
