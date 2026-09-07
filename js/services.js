    // Fil conducteur — se dessine progressivement pendant que les 6 services défilent à l'écran.
    (function(){
      var section = document.querySelector('.services-steps');
      var path = document.querySelector('.thread-svg path');
      if(!section || !path) return;

      function updateThread(){
        var rect = section.getBoundingClientRect();
        var vh = window.innerHeight;
        var progress = (vh - rect.top) / (rect.height + vh * 0.4);
        progress = Math.max(0, Math.min(1, progress));
        path.style.strokeDashoffset = (100 - progress * 100);
      }

      window.addEventListener('scroll', updateThread, { passive: true });
      window.addEventListener('resize', updateThread);
      updateThread();
    })();
  
