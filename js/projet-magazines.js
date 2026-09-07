    var shelf = document.getElementById('shelf');
    var reader = document.getElementById('reader');
    var commission = document.getElementById('commission');
    var readerTitle = document.getElementById('reader-title');
    var pageFrame = document.getElementById('page-frame');
    var pageLabel = document.getElementById('mag-page');
    var hoverNote = document.getElementById('hover-note');

    var DEFAULT_NOTE = 'Chaque magazine est une création sur mesure, pensée comme un cadeau personnalisé — anniversaire, mariage, ou toute autre occasion à célébrer. Clique sur une couverture pour la feuilleter.';

    var hoverDescriptions = {
      0: "Numéro « ELLE » réalisé pour les 25 ans d'Alice : son parcours, ses passions, une recette twistée et un quiz \"Plutôt duchesse, sorcière ou princesse ?\".",
      1: "Numéro « VOGUE — Bride Edition » conçu pour l'EVJF d'Afifa : interview de son frère, playlist, recette de cocktail et quiz \"Quelle mariée es-tu ?\".",
      2: "Trombinoscope de fin de promo « SUPDEPUB 2024-2026 » : portraits, souvenirs et moments de la promo réunis dans un magazine collector.",
      3: "Envie d'un magazine sur mesure pour vous ou l'un de vos proches ?",
      4: "Envie d'un magazine sur mesure pour vous ou l'un de vos proches ?"
    };

    // Magazine 0 = ELLE Alice Baverel — vraies pages reçues.
    // Magazine 1 = VOGUE Afifa Oaf, Bride Edition — vraies pages reçues.
    // "single" = page affichée seule. "spread" = double-page (2 images côte à côte).
    var magazines = {
      0: {
        title: 'ELLE — ALICE',
        folder: 'media/magazine',
        views: [
          { type:'single', files:['page-01'] },
          { type:'spread', files:['page-04','page-05'] },
          { type:'spread', files:['page-08','page-09'] },
          { type:'spread', files:['page-10','page-11'] },
          { type:'spread', files:['page-14','page-15'] },
          { type:'spread', files:['page-18','page-19'] },
          { type:'spread', files:['page-20','page-21'] },
          { type:'spread', files:['page-26','page-27'] },
          { type:'spread', files:['page-30','page-31'] },
          { type:'spread', files:['page-44','page-45'] },
          { type:'spread', files:['page-46','page-47'] },
          { type:'spread', files:['page-48','page-49'] },
          { type:'single', files:['page-62'] }
        ]
      },
      1: {
        title: 'VOGUE — AFIFA (BRIDE EDITION)',
        folder: 'media/magazine2',
        views: [
          { type:'single', files:['cover'] },
          { type:'spread', files:['tomford-ad','tomford-portrait'] },
          { type:'spread', files:['sommaire','qui-est-afifa'] },
          { type:'spread', files:['symphony-l','symphony-r'] },
          { type:'spread', files:['passions-l','passions-r'] },
          { type:'spread', files:['recette-l','recette-r'] },
          { type:'spread', files:['pointmode-l','pointmode-r'] },
          { type:'spread', files:['interview-l','interview-r'] },
          { type:'spread', files:['recommandations','visionboard'] },
          { type:'spread', files:['secretgold','samemarriage'] },
          { type:'spread', files:['playlist','cosmos'] },
          { type:'spread', files:['quellemariee','quiz-suite'] },
          { type:'spread', files:['motscroises','solutions'] },
          { type:'single', files:['backcover'] }
        ]
      },
      2: {
        title: 'SUPDEPUB — PROMO 2024-2026',
        folder: 'media/magazine3',
        views: [
          { type:'single', files:['page-01'] },
          { type:'spread', files:['page-04','page-05'] },
          { type:'spread', files:['page-08','page-09'] },
          { type:'spread', files:['page-10','page-11'] },
          { type:'spread', files:['page-12','page-13'] },
          { type:'spread', files:['page-14','page-15'] },
          { type:'spread', files:['page-16','page-17'] },
          { type:'spread', files:['page-18','page-19'] },
          { type:'spread', files:['page-22','page-23'] },
          { type:'spread', files:['page-24','page-25'] },
          { type:'spread', files:['page-26','page-27'] },
          { type:'spread', files:['page-28','page-29'] },
          { type:'spread', files:['page-30','page-31'] },
          { type:'spread', files:['page-32','page-33'] },
          { type:'spread', files:['page-34','page-35'] },
          { type:'spread', files:['page-36','page-37'] },
          { type:'spread', files:['page-38','page-39'] },
          { type:'spread', files:['page-40','page-41'] },
          { type:'spread', files:['page-42','page-43'] },
          { type:'spread', files:['page-44','page-45'] },
          { type:'spread', files:['page-46','page-47'] },
          { type:'spread', files:['page-54','page-55'] },
          { type:'spread', files:['page-56','page-57'] },
          { type:'spread', files:['page-58','page-59'] },
          { type:'spread', files:['page-60','page-61'] },
          { type:'spread', files:['page-62','page-63'] },
          { type:'spread', files:['page-64','page-65'] },
          { type:'spread', files:['page-74','page-75'] },
          { type:'spread', files:['page-76','page-77'] },
          { type:'spread', files:['page-78','page-79'] },
          { type:'spread', files:['page-80','page-81'] },
          { type:'spread', files:['page-82','page-83'] },
          { type:'single', files:['page-86'] }
        ]
      }
    };

    var currentMag = null, viewIndex = 0;

    function renderPage(){
      var mag = magazines[currentMag];
      if(!mag){
        pageFrame.className = 'page-frame';
        pageFrame.innerHTML = '<div class="placeholder-inner"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/></svg></div>';
        pageLabel.textContent = 'Page 1 / 1';
        return;
      }
      var view = mag.views[viewIndex];
      if(view.type === 'spread'){
        pageFrame.className = 'page-frame spread';
        pageFrame.innerHTML = view.files.map(function(f){
          return '<img src="' + mag.folder + '/' + f + '.jpg" alt="">';
        }).join('');
      } else {
        pageFrame.className = 'page-frame';
        pageFrame.innerHTML = '<img src="' + mag.folder + '/' + view.files[0] + '.jpg" alt="">';
      }
      pageLabel.textContent = 'Page ' + (viewIndex + 1) + ' / ' + mag.views.length;
    }

    document.querySelectorAll('.mag-cover').forEach(function(cover){
      var magId = parseInt(cover.dataset.mag, 10);

      cover.addEventListener('mouseenter', function(){
        hoverNote.textContent = hoverDescriptions[magId] || DEFAULT_NOTE;
      });
      cover.addEventListener('mouseleave', function(){
        hoverNote.textContent = DEFAULT_NOTE;
      });

      cover.addEventListener('click', function(){
        // Emplacements 3 et 4 : pas de magazine, on propose un numéro sur mesure.
        if(magId === 3 || magId === 4){
          shelf.classList.add('hidden');
          commission.classList.add('active');
          return;
        }
        currentMag = magId;
        viewIndex = 0;
        var mag = magazines[magId];
        readerTitle.textContent = mag ? mag.title : 'MAGAZINE À VENIR';
        shelf.classList.add('hidden');
        reader.classList.add('active');
        renderPage();
      });
    });

    document.getElementById('reader-close').addEventListener('click', function(){
      reader.classList.remove('active');
      shelf.classList.remove('hidden');
    });
    document.getElementById('commission-close').addEventListener('click', function(){
      commission.classList.remove('active');
      shelf.classList.remove('hidden');
    });

    document.getElementById('mag-next').addEventListener('click', function(){
      var mag = magazines[currentMag];
      if(!mag) return;
      viewIndex = (viewIndex + 1) % mag.views.length;
      renderPage();
    });
    document.getElementById('mag-prev').addEventListener('click', function(){
      var mag = magazines[currentMag];
      if(!mag) return;
      viewIndex = (viewIndex - 1 + mag.views.length) % mag.views.length;
      renderPage();
    });
  
