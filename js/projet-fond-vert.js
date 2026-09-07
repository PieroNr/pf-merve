    var track = document.getElementById('video-track');
    var slides = track.children;
    var dots = document.querySelectorAll('#dots span');
    var index = 0;

    function update(){
      track.style.transform = 'translateX(-' + (index * 100) + '%)';
      dots.forEach(function(d, i){ d.classList.toggle('active', i === index); });
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
  
