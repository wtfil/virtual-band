import {
	MIC_ENABLED,
	PEER_ADDED,
	PEER_DISCONNECTED,
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
	case PEER_DISCONNECTED:
		return {...state, remoteStreams: []}; // TODO handle peers

	default:
		return state;
	}
}

export function bands(state = INITIAL_BANDS, action) {
	switch (action.type) {
	case PEER_ADDED:
		return {...state, peers: [...state.peers, action.peer]};
	case PEER_DISCONNECTED:
		return {...state, peers: []}; // TODO handle peers
	default:
		return state;
	}

}
