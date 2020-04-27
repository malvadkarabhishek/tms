if('serviceWorker' in navigator){
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log())
      
      .catch(err => console.log());
      
  }

  // let installDiv = document.querySelector('install-div');
  // installDiv.style.display = 'none';

  var installBtn = document.querySelector(".install");
  installBtn.style.display = "none";

  let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI notify the user they can install the PWA
  installBtn.style.display = "inline";
});

installBtn.addEventListener('click', (e) => {
  // Hide the app provided install promotion
  installBtn.style.display = "none";
  // Show the install prompt
  deferredPrompt.prompt();
  // Wait for the user to respond to the prompt
  deferredPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === 'accepted') {
      
    } else {
      
    }
  })
});

