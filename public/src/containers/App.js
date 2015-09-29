import React from 'react';
import {connect} from 'react-redux';
import {startPeer, requestAudio} from '../actions';

let App = React.createClass({

	componentWillMount() {
		this.props.dispatch(startPeer());
	},
	render() {
		const {audio} = this.props;

		return <div className="well">
			{audio.enabled ?
				<span>Remote streams: {audio.remoteStreams.length}</span> :
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
