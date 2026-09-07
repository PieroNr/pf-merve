    var titles = ['Clip vidéo 1', 'À venir'];
    var videos = ['SQ0NNKyj4Bw', ''];
    var current = 0;
    var cards = document.querySelectorAll('.card');
    var trackTitle = document.getElementById('track-title');
    var viewer = document.getElementById('video-viewer');
    var viewerFrame = document.getElementById('video-viewer-frame');

    function render(){
      cards.forEach(function(card, i){
        card.classList.remove('left','right','active');
        if(i === current){ card.classList.add('active'); }
        else if((i === current - 1) || (current === 0 && i === cards.length - 1)){ card.classList.add('left'); }
        else { card.classList.add('right'); }
      });
      trackTitle.textContent = titles[current] || 'Clip';
    }

    function openViewer(){
      var videoId = videos[current];
      if(!videoId){
        viewerFrame.className = 'commission-frame';
        viewerFrame.innerHTML = '<svg viewBox="0 0 24 24"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>' +
          '<h3>Et si votre clip se trouvait ici ?</h3>' +
          '<p>Ce clip n\'existe pas encore — le vôtre pourrait. Parlons de votre projet musical.</p>' +
          '<a href="contact.html" class="cta-link">EN DISCUTER →</a>';
        viewer.classList.add('active');
        return;
      }
      viewerFrame.className = 'tv-viewer-frame';
      viewerFrame.innerHTML = '<iframe src="https://www.youtube.com/embed/' + videoId + '" title="Clip vidéo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="width:100%; height:100%; border-radius:8px;"></iframe>';
      viewer.classList.add('active');
    }

    document.getElementById('next').addEventListener('click', function(){
      current = (current + 1) % cards.length;
      render();
    });
    document.getElementById('prev').addEventListener('click', function(){
      current = (current - 1 + cards.length) % cards.length;
      render();
    });
    document.getElementById('play-btn').addEventListener('click', openViewer);
    cards.forEach(function(card, i){
      card.addEventListener('click', function(){
        if(i === current){ openViewer(); return; }
        current = i; render(); resetAutoRotate();
      });
    });
    document.getElementById('video-viewer-close').addEventListener('click', function(){
      viewer.classList.remove('active');
      viewerFrame.className = 'tv-viewer-frame';
      viewerFrame.innerHTML = '';
    });

    // Légère rotation automatique — s'arrête si l'utilisateur interagit, reprend après.
    var autoRotate;
    function startAutoRotate(){
      autoRotate = setInterval(function(){
        current = (current + 1) % cards.length;
        render();
      }, 4000);
    }
    function resetAutoRotate(){
      clearInterval(autoRotate);
      startAutoRotate();
    }
    startAutoRotate();
  
