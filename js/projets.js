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
        }
      });
    });
  
