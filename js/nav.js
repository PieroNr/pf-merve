// Menu mobile : ouvre/ferme le panneau de liens au clic sur le bouton burger.
(function(){
  var nav = document.querySelector('.nav');
  var toggle = document.querySelector('.nav-toggle');
  if(!nav || !toggle) return;

  function closeMenu(){
    nav.classList.remove('nav-open');
    toggle.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.setAttribute('aria-expanded', 'false');
  toggle.addEventListener('click', function(){
    var open = nav.classList.toggle('nav-open');
    toggle.classList.toggle('active', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // Cliquer un lien referme le panneau (utile en navigation sur la même page).
  nav.querySelectorAll('.nav-links a').forEach(function(a){
    a.addEventListener('click', closeMenu);
  });
})();
