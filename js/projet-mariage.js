    var book = document.getElementById('book');
    var cover = document.getElementById('book-cover');
    var opened = false;
    cover.addEventListener('click', function(){
      opened = !opened;
      book.classList.toggle('open', opened);
    });

    // Chaque "spread" (double-page) associe jusqu'à 2 photos.
    var spreads = [
      ['media/mariage-1.jpg', 'media/mariage-2.jpg'],
      ['media/mariage-3.jpg', 'media/mariage-4.jpg'],
      ['media/mariage-5.jpg', null]
    ];
    var page = 0, total = spreads.length;
    var label = document.getElementById('pg-label');
    var left = document.getElementById('page-left');
    var right = document.getElementById('page-right');

    function render(){
      var spread = spreads[page];
      left.style.backgroundImage = spread[0] ? 'url(' + spread[0] + ')' : 'none';
      left.classList.toggle('empty', !spread[0]);
      right.style.backgroundImage = spread[1] ? 'url(' + spread[1] + ')' : 'none';
      right.classList.toggle('empty', !spread[1]);
      label.textContent = 'Page ' + (page + 1) + ' / ' + total;
    }

    document.getElementById('pg-next').addEventListener('click', function(){
      page = (page + 1) % total; render();
    });
    document.getElementById('pg-prev').addEventListener('click', function(){
      page = (page - 1 + total) % total; render();
    });

    render();
  
