    function formatTime(ms){
      var totalSec = Math.floor(ms / 1000);
      var min = Math.floor(totalSec / 60);
      var sec = totalSec % 60;
      return min + ':' + (sec < 10 ? '0' : '') + sec;
    }

    document.querySelectorAll('.clip-card').forEach(function(card, i){
      var trackUrl = card.dataset.track;
      var iframe = document.createElement('iframe');
      iframe.className = 'sc-frame';
      iframe.id = 'sc-frame-' + i;
      iframe.setAttribute('allow', 'autoplay');
      iframe.src = 'https://w.soundcloud.com/player/?url=' + encodeURIComponent(trackUrl) +
        '&auto_play=false&show_artwork=false&show_comments=false&show_user=false&show_reposts=false&visual=false';
      card.appendChild(iframe);

      var vinyl = card.querySelector('.vinyl');
      var seekTrack = card.querySelector('.seek-track');
      var seekFill = card.querySelector('.seek-fill');
      var seekHandle = card.querySelector('.seek-handle');
      var timeCurrent = card.querySelector('.time-current');
      var timeDuration = card.querySelector('.time-duration');

      var duration = 0;
      var dragging = false;

      iframe.addEventListener('load', function(){
        var widget = SC.Widget(iframe);

        widget.bind(SC.Widget.Events.READY, function(){
          widget.getDuration(function(d){
            duration = d;
            timeDuration.textContent = formatTime(d);
          });
        });

        widget.bind(SC.Widget.Events.PLAY, function(){
          vinyl.classList.add('spinning');
        });
        widget.bind(SC.Widget.Events.PAUSE, function(){
          vinyl.classList.remove('spinning');
        });
        widget.bind(SC.Widget.Events.FINISH, function(){
          vinyl.classList.remove('spinning');
        });

        widget.bind(SC.Widget.Events.PLAY_PROGRESS, function(data){
          if(dragging) return;
          var ratio = duration ? (data.currentPosition / duration) : 0;
          seekFill.style.width = (ratio * 100) + '%';
          seekHandle.style.left = (ratio * 100) + '%';
          timeCurrent.textContent = formatTime(data.currentPosition);
        });

        vinyl.addEventListener('click', function(){
          widget.toggle();
        });

        function seekFromEvent(e){
          var rect = seekTrack.getBoundingClientRect();
          var clientX = e.touches ? e.touches[0].clientX : e.clientX;
          var ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
          seekFill.style.width = (ratio * 100) + '%';
          seekHandle.style.left = (ratio * 100) + '%';
          if(duration){
            timeCurrent.textContent = formatTime(ratio * duration);
            widget.seekTo(ratio * duration);
          }
        }

        seekTrack.addEventListener('mousedown', function(e){ dragging = true; seekFromEvent(e); });
        window.addEventListener('mousemove', function(e){ if(dragging) seekFromEvent(e); });
        window.addEventListener('mouseup', function(){ dragging = false; });
        seekTrack.addEventListener('touchstart', function(e){ dragging = true; seekFromEvent(e); });
        window.addEventListener('touchmove', function(e){ if(dragging) seekFromEvent(e); });
        window.addEventListener('touchend', function(){ dragging = false; });
      });
    });
  
