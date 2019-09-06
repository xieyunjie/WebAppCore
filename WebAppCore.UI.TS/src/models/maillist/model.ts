import { MailListType } from "./data";
import { Effect } from "dva";
import { Reducer } from "redux";

import * as service from '@/services/maillist/service';  

export interface ModelState {
    MailList: MailListType[],
    CMail: MailListType | null,
    //editModalVisible: boolean,
    EmptyMail: MailListType | null
}

export interface ModelType {
    namespace: 'mailcenter_maillist';
    state: ModelState;
    effects: {
        GetMailList: Effect;
        SaveMailList: Effect;
        DeleteMailList: Effect;
    };
    reducers: {
        save: Reducer<ModelState>;
    }
}

const MailListModel: ModelType = {
    namespace: 'mailcenter_maillist',

    state: {
        MailList: [],
        CMail: {
            Id: 0,
            Name: '',
            DisplayName: '',
            Subject: '',
            MailBody: '',
            IsHtml: true,
            MailSendTypeId: 1,
            MailSendEndId: 1,
            Status: 1,
            MailSendEnd: null,
            MailSendType: null,
            McMailReceiveEnd: []
        },
        //editModalVisible: false,
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
            MailSendEnd: null,
            MailSendType: null,
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
            payload,
            callback
        }, {
            put,
            call,
            select
        }) {
            const res = yield call(service.SaveMailList, payload);
            if (callback) {
                callback(res); 
            }
            return res;
        },
        * DeleteMailList({
            payload, callback
        }, {
            put,
            call,
            select
        }) {
            const res = yield call(service.DeleteMailList, payload);
            if (callback) callback(res);
            // return res;
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

export default MailListModel;