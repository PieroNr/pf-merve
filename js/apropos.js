// Fil de progression : sa partie remplie avance au même rythme que le défilement
// à travers les trois sections du parcours.
var story = document.getElementById('story');
var threadFill = document.getElementById('thread-fill');

function updateThread(){
  if(!story || !threadFill) return;
  var rect = story.getBoundingClientRect();
  var total = story.offsetHeight - window.innerHeight;
  if(total <= 0){ threadFill.style.height = '100%'; return; }
  var scrolled = -rect.top;
  var pct = Math.max(0, Math.min(1, scrolled / total));
  threadFill.style.height = (pct * 100) + '%';
}
window.addEventListener('scroll', updateThread, { passive: true });
window.addEventListener('resize', updateThread);
updateThread();

// Apparition progressive du texte : chaque bloc se dévoile à son entrée dans l'écran.
var reveals = document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
  reveals.forEach(function(el){ io.observe(el); });
} else {
  reveals.forEach(function(el){ el.classList.add('is-visible'); });
}
