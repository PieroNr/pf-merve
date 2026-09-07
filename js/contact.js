    // Ouvre le client mail de l'utilisateur avec le message pré-rempli.
    // Ton ami codeur peut remplacer ceci par un vrai service d'envoi
    // (ex: Formspree, Framer's native form action) pour un envoi silencieux sans ouvrir le client mail.
    document.getElementById('contact-form').addEventListener('submit', function(e){
      e.preventDefault();
      var name = document.getElementById('name').value;
      var email = document.getElementById('email').value;
      var message = document.getElementById('message').value;
      var subject = encodeURIComponent('Nouveau message depuis le portfolio — ' + name);
      var body = encodeURIComponent(message + '\n\n---\n' + name + '\n' + email);
      window.location.href = 'mailto:merveborza@gmail.com?subject=' + subject + '&body=' + body;
    });
  
