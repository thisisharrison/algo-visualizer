import { START_ANIMATION, END_ANIMATION } from '../actions/animation_actions';

export const toolbarReducer = (state = {disabled : false}, action) => {
    switch (action.type) {
        case START_ANIMATION:
            return Object.assign({}, { disabled: true });
        case END_ANIMATION:
            return Object.assign({}, { disabled: false });
        default: 
            return state;
    }
}

export default toolbarReducer;