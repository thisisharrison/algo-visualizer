import { RECEIVE_ANIMATION } from '../actions/animation_actions';
import { CLEAR_NUMBERS } from '../actions/list_actions'; 

const animationReducer = (state = [], action) => {
    switch (action.type) {
        case RECEIVE_ANIMATION:
            return [...state, action.animation];
        case CLEAR_NUMBERS: 
            return [];
        default: 
            return [];
    }
}

export default animationReducer;