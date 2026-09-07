    var slides = document.querySelectorAll('.vf-slide');
    var counter = document.getElementById('counter');
    var caption = document.getElementById('vf-caption');
    var current = 0;
    document.getElementById('shutter').addEventListener('click', function(){
      slides[current].classList.remove('active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('active');
      counter.textContent = ('0' + (current + 1)).slice(-2) + ' / 0' + slides.length;
      caption.textContent = slides[current].dataset.caption;
    });
  
