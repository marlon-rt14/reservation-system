const office = document.getElementById('office');
const employee = document.getElementById('employee');
const reservation = document.getElementById('reservation');
const vehicle = document.getElementById('vehicle');

if (office) {
	office.addEventListener('click', () => {
		window.open(window.location.href + "links/office", "_self");
	});
}

if (employee) {
	employee.addEventListener('click', () => {
		window.open(window.location.href + "links/employee", "_self");
	});
}

if (reservation) {
	reservation.addEventListener('click', () => {
		window.open(window.location.href + "links/reservation", "_self");
	});
}

if (vehicle) {
	vehicle.addEventListener('click', () => {
		window.open(window.location.href + "links/vehicle", "_self");
	});
}