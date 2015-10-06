import React, {Component} from 'react';

export default class PlayAudio extends Component {

	componentWillMount() {
		this.audio = new Audio();
		this.audio.src = URL.createObjectURL(this.props.stream);
		if (this.props.play) {
			this.audio.play();
		}
	}

	componentWillUnmount() {
		this.audio.pause();
		delete this.audio;
	}

	componentWillReceiveProps(newProps) {
		console.log('new props', newProps);
	}

	render() {
		return null;
	}
}
