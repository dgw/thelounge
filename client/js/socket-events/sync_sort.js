"use strict";

const socket = require("../socket");
const {vueApp} = require("../vue");

socket.on("sync_sort", function(data) {
	const order = data.order;

	switch (data.type) {
		case "networks":
			vueApp.networks.sort((a, b) => order.indexOf(a.uuid) - order.indexOf(b.uuid));

			break;

		case "channels": {
			const network = vueApp.networks.find((n) => n.uuid === data.target);

			if (!network) {
				return;
			}

			network.channels.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));

			break;
		}
	}
});
