function listenTo({subscribe, getState}) {
	subscribe(() => {
		getState().audio.remoteStreams.forEach(stream => {
			const a = new Audio();
			a.src = URL.createObjectURL(stream);
			a.play();
		});
	});
}

export default {listenTo};
