
const form = document.getElementById('form');

const btnSave = document.getElementById('btn-save');
const btnDelete = document.getElementById('btn-delete');

btnSave.addEventListener('click', () => {
	form.setAttribute('action', '/links/reservation');
});

btnDelete.addEventListener('click', () => {
	const id = document.getElementById('idForm');
	form.setAttribute('action', '/links/reservation/delete/' + id.value);
});