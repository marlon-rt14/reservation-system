const navLogger = document.getElementById('nav-watch-logger');
const navSummary = document.getElementById('nav-watch-summary');

navLogger.addEventListener('click', () => {
	navLogger.classList.add('active');
	navSummary.classList.remove('active');
});

navSummary.addEventListener('click', () => {
	navSummary.classList.add('active');
	navLogger.classList.remove('active');
});
