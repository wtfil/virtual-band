import {
	MIC_ENABLED,
	PEER_ADDED,
	INCOMING_STREAM
} from './actions';

const INITIAL_AUDIO = {
	enabled: false,
	stream: null,
	remoteStreams: []
};

const INITIAL_BANDS = {
	current: 123,
	peers: [],
	all: []
};

export function audio(state = INITIAL_AUDIO, action) {
	switch (action.type) {
	case MIC_ENABLED:
		return {...state, enabled: true, stream: action.stream};
	case INCOMING_STREAM:
		return {
			...state,
			remoteStreams: [...state.remoteStreams, action.stream]
		};
	default:
		return state;
	}
}

export function bands(state = INITIAL_BANDS, action) {
	switch (action.type) {
	case PEER_ADDED:
		return {...state, peers: [...state.peers, action.peer]};
	default:
		return state;
	}

}
