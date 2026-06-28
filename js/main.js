
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