const date = require('date-and-time');

const helpers = {};

helpers.toDate = (timestamp) => {
	return date.format(timestamp, 'MMM DD YYYY');
};

helpers.toTimeStamp = (currentDate) => {
	// return date.parse(currentDate, 'ddd, MMM DD YYYY HH:mm:ss [GMT]Z');
	return date.parse(currentDate, 'MMM DD YYYY');
};

helpers.toShortDate = (timestamp) => {
	return date.format(timestamp, 'ddd, MMM DD YYYY HH:mm:ss');
};

module.exports = helpers;



