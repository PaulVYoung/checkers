Meteor.startup(function () {
	if (Pieces.find().count() === 0) {
		for (var i = 1; i < 25; i++) {
			Pieces.insert({
				x: Math.round(Math.random() * 400),
				y: Math.round(Math.random() * 400),
				r: 20,
				color: (i%2)?"red":"yellow"
			});
		}
	}
});
