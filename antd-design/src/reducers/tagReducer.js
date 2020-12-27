import * as constant from "../actions/constants";

const intitalState = {
	tags: [],
	loading: true,
}

export default function(state = intitalState, action) {
	switch (action.type) {
		case constant.GET_TAGS:
			return {
				...state,
				tags: action.payload,
				loading: false,
			};
		case constant.DELETE_TAG:
			return {
				...state,
				tags: state.tags.filter(comment => comment.id !== action.payload),
				loading: false
			};
		default:
			...state
	}
}