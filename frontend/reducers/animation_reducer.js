import { RECEIVE_ANIMATION } from '../actions/animation_actions';
import { CLEAR_NUMBERS, RESET_NUMBERS } from '../actions/list_actions'; 

const animationReducer = (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_ANIMATION:
            return [...state, action.animation]
        case CLEAR_NUMBERS: 
            return [];
        case RESET_NUMBERS: 
            return [];
        default: 
            return state;
    }
}

export default animationReducer;