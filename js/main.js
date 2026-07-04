
// Theme 
(function(){
	const id = 'toggleDarkMode';
	function $(s){return document.getElementById(s)}
	function setTheme(theme){
		if(theme === 'light') document.body.classList.add('theme-light');
		else document.body.classList.remove('theme-light');
		const btn = $(id);
		if(!btn) return;
		btn.classList.toggle('light', theme === 'light');
		btn.innerHTML = theme === 'light' ? '<i class="bi bi-sun-fill"></i>' : '<i class="bi bi-moon-fill"></i>';
	}
	// init
	
	document.addEventListener('DOMContentLoaded', function(){
		const btn = $(id);
		if(!btn) return;
		const saved = localStorage.getItem('afritalent-theme') || 'dark';
		setTheme(saved);
		btn.addEventListener('click', function(){
			const current = document.body.classList.contains('theme-light') ? 'light' : 'dark';
			const next = current === 'light' ? 'dark' : 'light';
			setTheme(next);
			localStorage.setItem('afritalent-theme', next);
		});
	});
})();


(function(){
	function createBackToTop() {
		const button = document.createElement('button');
		button.id = 'backToTop';
		button.type = 'button';
		button.setAttribute('aria-label', 'Retour en haut');
		button.innerHTML = '&uarr;';
		document.body.appendChild(button);
		button.addEventListener('click', function(){
			window.scrollTo({ top: 0, behavior: 'smooth' });
		});
		return button;
	}

	document.addEventListener('DOMContentLoaded', function(){
		const backToTop = createBackToTop();

		function updateBackToTop() {
			if(window.scrollY > 350) {
				backToTop.classList.add('visible');
			} else {
				backToTop.classList.remove('visible');
			}
		}

		updateBackToTop();
		window.addEventListener('scroll', updateBackToTop, { passive: true });
	});
})();

function updateNavbarScroll() {
	const navbar = document.querySelector('.navbar.fixed-top');
	if (!navbar) return;
	navbar.classList.toggle('scrolled', window.scrollY > 50);
}

document.addEventListener('DOMContentLoaded', updateNavbarScroll);
window.addEventListener('scroll', updateNavbarScroll, { passive: true });

document.addEventListener('DOMContentLoaded', function () {
	const searchInput = document.getElementById('freelanceSearch');
	const filterSelect = document.getElementById('freelanceFilter');
	const cards = Array.from(document.querySelectorAll('.freelance-card'));
	const grid = document.getElementById('freelanceGrid');

	if (!searchInput || !filterSelect || !cards.length || !grid) return;

	function applyFilters() {
		const query = searchInput.value.trim().toLowerCase();
		const role = filterSelect.value.trim().toLowerCase();
		let visibleCount = 0;

		cards.forEach((card) => {
			const name = card.dataset.name?.toLowerCase() || '';
			const cardRole = card.dataset.role?.toLowerCase() || '';
			const matchesQuery = !query || name.includes(query) || cardRole.includes(query);
			const matchesRole = !role || cardRole.includes(role);
			const isVisible = matchesQuery && matchesRole;

			card.classList.toggle('is-hidden', !isVisible);
			if (isVisible) visibleCount++;
		});

		const existingMessage = grid.querySelector('.no-results');
		if (existingMessage) existingMessage.remove();

		if (!visibleCount) {
			const emptyState = document.createElement('div');
			emptyState.className = 'no-results col-12';
			emptyState.textContent = 'Aucun freelance ne correspond à votre recherche.';
			grid.appendChild(emptyState);
		}
	}

	searchInput.addEventListener('input', applyFilters);
	filterSelect.addEventListener('change', applyFilters);
	applyFilters();
});

document.addEventListener('DOMContentLoaded', function () {
	const statsContainer = document.querySelector('.stats-container');
	if (!statsContainer) return;

	const counters = Array.from(statsContainer.querySelectorAll('.counter-value'));
	if (!counters.length) return;

	function animateCounter(counter) {
		if (counter.dataset.animated === 'true') return;

		const target = Number(counter.dataset.target || counter.textContent.replace(/\D/g, '')) || 0;
		const prefix = counter.dataset.prefix || '';
		const suffix = counter.dataset.suffix || '';
		const duration = 1300;
		const startTime = performance.now();

		function update(now) {
			const progress = Math.min((now - startTime) / duration, 1);
			const eased = 1 - Math.pow(1 - progress, 3);
			const value = Math.round(target * eased);
			counter.textContent = `${prefix}${value.toLocaleString('fr-FR')}${suffix}`;

			if (progress < 1) {
				requestAnimationFrame(update);
			} else {
				counter.textContent = `${prefix}${target.toLocaleString('fr-FR')}${suffix}`;
				counter.dataset.animated = 'true';
				counter.classList.add('is-animated');
			}
		}

		requestAnimationFrame(update);
	}

	counters.forEach((counter, index) => {
		setTimeout(() => animateCounter(counter), index * 150);
	});
})


document.addEventListener('DOMContentLoaded', function () {
	const form = document.querySelector('.contact-form');
	if (!form) return;

	const nom = document.getElementById('nom');
	const prenom = document.getElementById('prenom');
	const email = document.getElementById('email');
	const message = document.getElementById('message');

	const nomError = document.getElementById('nomError');
	const prenomError = document.getElementById('prenomError');
	const emailError = document.getElementById('emailError');
	const messageError = document.getElementById('messageError');
	const successMessage = document.getElementById('successMessage');

	function clearValidation() {
		nomError.textContent = '';
		prenomError.textContent = '';
		emailError.textContent = '';
		messageError.textContent = '';
		successMessage.textContent = '';
	}

	function isValidEmail(value) {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
	}

	form.addEventListener('input', clearValidation);

	form.addEventListener('submit', function (event) {
		event.preventDefault();
		clearValidation();

		let isValid = true;
		const nomValue = nom.value.trim();
		const prenomValue = prenom.value.trim();
		const emailValue = email.value.trim();
		const messageValue = message.value.trim();

		if (nomValue.length < 2) {
			nomError.textContent = 'Le nom doit contenir au moins 2 caractères.';
			isValid = false;
		}

		if (prenomValue.length < 2) {
			prenomError.textContent = 'Le prénom doit contenir au moins 2 caractères.';
			isValid = false;
		}

		if (!isValidEmail(emailValue)) {
			emailError.textContent = 'Adresse email invalide.';
			isValid = false;
		}

		if (messageValue.length < 20) {
			messageError.textContent = 'Le message doit contenir au moins 20 caractères.';
			isValid = false;
		}

		if (isValid) {
			successMessage.textContent = 'Message envoyé avec succès !';
			form.reset();
		}
	});
});

