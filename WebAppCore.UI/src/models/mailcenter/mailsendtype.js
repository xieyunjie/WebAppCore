import * as service from '@/services/mailcenter/mailsendtype';


const model = {

    namespace: 'mailcenter_mailsendtype',

    state:{
        MailSendTypeList:[]
    },
      effects: {

        * Init({
          payload
        }, {
          put,
          call,
          select
        }) {
          const data = yield call(service.GetMailSendTypeList, {});
          return yield put({
            type: 'save',
            payload: {
              MailSendTypeList: data
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