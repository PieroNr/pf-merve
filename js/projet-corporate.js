    var track = document.getElementById('video-track');
    var slides = track.children;
    var dots = document.querySelectorAll('#dots span');
    var postText = document.getElementById('post-text');
    var index = 0;

    var descriptions = [
      "Scantech au K Show, à Düsseldorf : immersion au cœur du plus grand salon mondial du plastique et du caoutchouc. Rôle : captation (b-roll)",
      "Captation sur le terrain du salon Batteries Event à Lyon : interview, complétée par du b-roll tourné en immersion (stands, mouvements, ambiance) pour habiller le montage. Rôle : captation (ITV, b-roll)",
      "Captation d'un partenariat inter-entreprises sur site industriel : interview pour donner la parole aux deux parties, b-roll pour illustrer. Rôle : captation (ITV, b-roll)",
      "Montage d'une vidéo bloopers sur DaVinci Resolve : sélection et dérushage des meilleurs moments ratés, rythme de montage travaillé pour l'effet comique, calage son et raccords cut serrés pour maximiser l'impact humoristique. Rôle : montage (DaVinci Resolve)"
    ];

    function update(){
      track.style.transform = 'translateX(-' + (index * 100) + '%)';
      dots.forEach(function(d, i){ d.classList.toggle('active', i === index); });
      postText.textContent = descriptions[index];
    }

    document.getElementById('next-btn').addEventListener('click', function(){
      index = (index + 1) % slides.length;
      update();
    });
    document.getElementById('prev-btn').addEventListener('click', function(){
      index = (index - 1 + slides.length) % slides.length;
      update();
    });
    dots.forEach(function(d, i){
      d.addEventListener('click', function(){ index = i; update(); });
    });

    // Bouton plein écran — passe la diapo vidéo active en plein écran natif du navigateur.
    document.querySelectorAll('.fullscreen-btn').forEach(function(btn){
      btn.addEventListener('click', function(e){
        e.stopPropagation();
        var slide = btn.closest('.video-slide');
        if(slide.requestFullscreen){ slide.requestFullscreen(); }
      });
    });
  
