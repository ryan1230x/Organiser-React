import * as constant from "../actions/constants";

const initialState = {
    tickets:[],
    loading:true
};

export default function(state = initialState, action) {
    switch(action.type) {
        case constant.GET_TICKETS:
            return {
                ...state,
                tickets: action.payload,
                loading: false
            }
        case constant.ADD_TICKET:
            return {
                ...state,
                tickets:[action.payload, ...state.tickets],
                loading: false
            }
        default:
            return state;
    }
}