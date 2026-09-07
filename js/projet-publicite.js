    var viewer = document.getElementById('tv-viewer');
    var frame = document.getElementById('tv-viewer-frame');
    document.querySelectorAll('.tv-unit').forEach(function(tv){
      var videoId = tv.dataset.video;
      if(videoId){
        var screen = tv.querySelector('.tv-screen');
        screen.style.backgroundImage = 'url(https://img.youtube.com/vi/' + videoId + '/hqdefault.jpg)';
        screen.classList.add('has-thumb');
      }
      tv.addEventListener('click', function(){
        var videoId = tv.dataset.video;
        if(tv.dataset.empty){
          frame.className = 'commission-frame';
          frame.innerHTML = '<svg viewBox="0 0 24 24"><path d="M12 2a2 2 0 0 1 2 2 2 2 0 0 1-4 0 2 2 0 0 1 2-2z"/><path d="M2 9l10-4 10 4-4 3v9H6v-9z"/></svg>' +
            '<h3>Et si votre pub se trouvait ici ?</h3>' +
            '<p>Cette campagne n\'existe pas encore — la vôtre pourrait. Parlons de votre projet publicitaire.</p>' +
            '<a href="contact.html" class="cta-link">EN DISCUTER →</a>';
          viewer.classList.add('active');
          return;
        }
        frame.className = 'tv-viewer-frame';
        frame.innerHTML = '<iframe src="https://www.youtube.com/embed/' + videoId + '" title="Campagne publicitaire" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="width:100%; height:100%; border-radius:8px;"></iframe>';
        viewer.classList.add('active');
      });
    });
    document.getElementById('tv-viewer-close').addEventListener('click', function(){
      viewer.classList.remove('active');
      frame.className = 'tv-viewer-frame';
      frame.innerHTML = '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';
    });
  
