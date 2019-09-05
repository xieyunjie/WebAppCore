 
import { Reducer } from "redux";
 

export interface ModelState {
    result: number,
    date:string
}

export interface ModelType {
    namespace: 'mailcenter_mailsendresult';
    state: ModelState;
    effects: { 
    };
    reducers: {
        save: Reducer<ModelState>;
    }
}

const model: ModelType = {
    namespace: 'mailcenter_mailsendresult',

    state: {
        result: 109,
        date:'2012-01-99'
    },
    effects: {
 
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