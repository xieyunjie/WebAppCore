import * as maillistSvc from '@/services/mailcenter/maillist';

const model = {

    namespace: 'mailcenter_maillist',
    
    state: {
        MailList:[]

    }, 

    effects: {
        
        *GetMailList({ payload }, { put, call, select }) {  
            const data = yield call(maillistSvc.GetMailList, {});
            return yield put({ type: 'save', payload: { MailList:data} });
          },
    }, 
    reducers: {
        save(state, action) {
            return { ...state, ...action.payload };
          },
    }
};

export default model;