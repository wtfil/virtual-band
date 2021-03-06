import Peer from 'web-peer';
import Firebase from 'firebase';
import io from 'socket.io-client';

const getUserMedia = (navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia).bind(navigator);
const socket = io.connect(window.location.host);

export const ASK_MIC = 'ASK_MIC';
export const MIC_ENABLED = 'MIC_ENABLED';
export const MIC_ERROR = 'MIC_ERROR';
export const PEER_ADDED = 'PEER_ADDED';
export const INCOMING_STREAM = 'INCOMING_STREAM';
export const PEER_DISCONNECTED = 'PEER_DISCONNECTED';

export function requestAudio() {
	return (dispatch, getState) => {
		dispatch({type: ASK_MIC});

		getUserMedia({audio: true}, stream => {
			const {bands} = getState();
			dispatch({type: MIC_ENABLED, stream});
			bands.peers[0].addStream(stream);
		}, err => {
			dispatch({type: MIC_ERROR, err});
		});
	}
}

export function startPeer() {
	return (dispatch, getState) => {
		const {bands} = getState();
		const peer = new Peer();

		socket.emit('band', {id: bands.current});
		peer.on('sync', data => socket.emit('sync', data));
		socket.on('sync', data => peer.sync(data));
		peer.on('stream', stream => {
			dispatch({type: INCOMING_STREAM, stream});
		});
		peer.on('disconnect', () => {
			dispatch({type: PEER_DISCONNECTED});
		})
		peer.on('error', console.error);

		dispatch({type: PEER_ADDED, peer});
	}
}
