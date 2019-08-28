import * as maillistSvc from '@/services/mailcenter/maillist';

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
      const data = yield call(maillistSvc.GetMailList, {});
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
