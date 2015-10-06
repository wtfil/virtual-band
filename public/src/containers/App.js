import React from 'react';
import {connect} from 'react-redux';
import {startPeer, requestAudio} from '../actions';
import PlayAudio from '../components/PlayAudio';

let App = React.createClass({

	componentWillMount() {
		this.props.dispatch(startPeer());
	},
	render() {
		const {audio} = this.props;

		return <div className="well">
			<span>Remote streams: {audio.remoteStreams.length}</span>
			<div>
				{audio.remoteStreams.map((stream, index) => {
					return <PlayAudio key={index} stream={stream} play/>
				})}
			</div>
			{!audio.enabled &&
				<button
					className="btn btn-primary"
					children="Enable mic"
					onClick={this.start}
				/>
			}
		</div>;
	},

	start() {
		this.props.dispatch(requestAudio());
	}
});

export default connect(state => state)(App);
