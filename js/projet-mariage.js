    var book = document.getElementById('book');
    var basePages = document.getElementById('book-pages');
    var baseLeft = document.getElementById('page-left');
    var baseRight = document.getElementById('page-right');
    var label = document.getElementById('pg-label');
    var coverLeaf = document.getElementById('book-cover');

    // Chaque "spread" associe 2 photos portrait (côte à côte), ou une seule
    // photo paysage affichée pleine largeur.
    var spreads = [
      ['media/mariage-1.jpg', null],
      ['media/mariage-2.jpg', 'media/mariage-3.jpg'],
      ['media/mariage-4.jpg', null],
      ['media/mariage-5.jpg', null]
    ];
    var total = spreads.length;

    function fillSpread(leftEl, rightEl, container, spread){
      var single = !spread[1];
      container.classList.toggle('single', single);
      leftEl.style.backgroundImage = spread[0] ? 'url(' + spread[0] + ')' : 'none';
      leftEl.classList.toggle('empty', !spread[0]);
      rightEl.style.backgroundImage = (!single && spread[1]) ? 'url(' + spread[1] + ')' : 'none';
      rightEl.classList.toggle('empty', !spread[1]);
    }

    // Le fond du livre affiche toujours la dernière double-page : chaque
    // feuille empilée par-dessus révèle la suivante en se tournant.
    fillSpread(baseLeft, baseRight, basePages, spreads[total - 1]);

    // La pile complète = la couverture, puis une feuille par double-page
    // (sauf la dernière, déjà visible en fond). Chaque feuille a un recto
    // (photo en couleur) et un verso (même photo, assombrie).
    var leaves = [coverLeaf];

    for(var i = 0; i < total - 1; i++){
      var leaf = document.createElement('div');
      leaf.className = 'book-leaf';

      var front = document.createElement('div');
      front.className = 'leaf-face pages-face';
      var frontLeft = document.createElement('div'); frontLeft.className = 'page';
      var frontRight = document.createElement('div'); frontRight.className = 'page';
      front.appendChild(frontLeft);
      front.appendChild(frontRight);

      var back = document.createElement('div');
      back.className = 'leaf-face pages-face back';
      var backLeft = document.createElement('div'); backLeft.className = 'page';
      var backRight = document.createElement('div'); backRight.className = 'page';
      back.appendChild(backLeft);
      back.appendChild(backRight);

      fillSpread(frontLeft, frontRight, front, spreads[i]);
      fillSpread(backLeft, backRight, back, spreads[i]);

      leaf.appendChild(front);
      leaf.appendChild(back);
      book.appendChild(leaf);
      leaves.push(leaf);
    }

    // Empilement initial : la couverture au-dessus de tout, puis les feuilles
    // dans l'ordre du livre fermé.
    for(var z = 0; z < leaves.length; z++){
      leaves[z].style.zIndex = leaves.length - z;
    }
    // Compteur toujours croissant : chaque feuille tournée passe au-dessus de
    // TOUTE la pile (couverture comprise) — elles s'empilent à gauche dans
    // l'ordre où on les tourne, jamais cachées derrière une feuille déjà ouverte.
    var zTop = leaves.length + 1;

    var turned = 0; // nombre de feuilles tournées (0 = livre fermé)
    var animating = false;

    function updateLabel(){
      label.textContent = turned === 0 ? 'Couverture' : ('Page ' + turned + ' / ' + total);
    }
    updateLabel();

    function goNext(){
      if(animating || turned >= leaves.length) return;
      animating = true;
      var leaf = leaves[turned];
      leaf.style.zIndex = zTop++;
      leaf.classList.add('turned');
      turned++;
      updateLabel();
      setTimeout(function(){ animating = false; }, 1000);
    }

    function goPrev(){
      if(animating || turned <= 0) return;
      animating = true;
      turned--;
      var leaf = leaves[turned];
      // Repasse aussi au-dessus de toute la pile : sans ça, elle garde son
      // ancien z-index et une page tournée plus tard peut rester visible
      // par-dessus alors qu'on est revenu avant elle.
      leaf.style.zIndex = zTop++;
      leaf.classList.remove('turned');
      updateLabel();
      setTimeout(function(){ animating = false; }, 1000);
    }

    // Les flèches pilotent toute la pile, couverture comprise : plus moyen de
    // faire tourner une page par-dessus une couverture encore fermée.
    document.getElementById('pg-next').addEventListener('click', goNext);
    document.getElementById('pg-prev').addEventListener('click', goPrev);

    // Cliquer sur la couverture reste possible tant qu'elle est fermée.
    coverLeaf.addEventListener('click', function(){
      if(turned === 0) goNext();
    });
