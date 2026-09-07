    document.querySelectorAll('.folder').forEach(function(folder){
      folder.addEventListener('click', function(){
        var project = folder.dataset.project;
        var pages = {
          'corporate': 'projet-corporate.html',
          'reels': 'projet-reels.html',
          'clip-video': 'projet-clip-video.html',
          'mariages': 'projet-mariage.html',
          'fond-vert': 'projet-fond-vert.html',
          'magazine': 'projet-magazines.html',
          'publicite': 'projet-publicite.html',
          'photos-evenements': 'projet-evenements.html',
          'interviews': 'projet-interviews.html',
          'court-metrage': 'projet-court-metrage.html'
        };
        if(pages[project]){
          window.location.href = pages[project];
        } else {
          // Page projet à créer — même principe que les 3 exemples fournis.
          console.log('Ouverture du projet :', project);
        }
      });
    });

    // Fil conducteur — se dessine progressivement pendant que la section
    // "De l'idée à l'image" défile à l'écran.
    (function(){
      var section = document.querySelector('.process-steps');
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
  
