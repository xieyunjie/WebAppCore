import { MailSendTypeType } from "./data";
import { Effect } from "dva";
import { Reducer } from "redux";

import * as service from './service';

export interface ModelState {
    MailSendTypeList: MailSendTypeType[]
}
export interface ModelType {
    namespace: 'mailcenter_mailsendtype';
    state: ModelState;
    effects: {
        Init: Effect;
    };
    reducers: {
        save: Reducer<ModelState>;
    }
}

const MailSendTypeModel: ModelType= {

    namespace: 'mailcenter_mailsendtype',

    state: {
        MailSendTypeList: []
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

export default MailSendTypeModel;