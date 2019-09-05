import { MailSendEndType } from "./data";
import { Effect } from "dva";
import { Reducer } from "redux";

import * as service from './service';

export interface ModelState {
    MailSendEndList: MailSendEndType[]
}
export interface ModelType {
    namespace: 'mailcenter_mailsendend';
    state: ModelState;
    effects: {
        Init: Effect; 
    };
    reducers: {
        save: Reducer<ModelState>;
    }
}

const MailSendEndModel: ModelType = {
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

export default MailSendEndModel;