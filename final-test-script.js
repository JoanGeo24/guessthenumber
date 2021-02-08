// Τα ερωτήματα 2 έως 7 θα απαντηθούν στο αρχείο αυτό

const newGuess = document.querySelector("#new-guess");
const message = document.querySelector("#message");
const lowHigh = document.querySelector("#low-high");
const checkButton = document.querySelector("#check");
const restartButton = document.querySelector("#restart");
const root = document.querySelector(":root");

restartButton.parentNode.removeChild(restartButton);
newGuess.focus();

let theGuess = newRandom();

let previousGuesses = [];
function logGuess(newGuess) {
  if (newGuess !== isNaN && newGuess !== null) {
    previousGuesses.push(Number(newGuess));
  }
}

// 2. να ορίσετε τους σχετικούς χειριστές συμβάντων
newGuess.addEventListener('keyup', checkKey);
checkButton.addEventListener('click', checkGuess);

/* 3. συνάρτηση που βρίσκει ένα τυχαίο αριθμό μεταξύ 1 και 100
   και τον εκχωρεί στη μεταβλητή theGuess */
function newRandom(){
  return Math.floor(Math.random()*100+1);
}

/* 4. συνάρτηση που όταν ο χρήστης πατήσει <<enter>>
 να καλεί τη συνάρτηση που αποτελεί τον κεντρικό ελεγκτή του παιχνιδιού.
 */
function checkKey(e) {
  if (e.code === "Enter") {
    checkGuess();
  }
}

/* 5. Να ορίσετε συνάρτηση checkGuess η οποία καλείται είτε όταν ο χρήστης πατήσει <<enter>>
  στο πεδίο "new-guess" είτε όταν πατήσει το πλήκτρο "check", η οποία είναι ο κεντρικός ελεγκτής,
  καλεί τη συνάρτηση processGuess (η οποία αποφαίνεται για την ορθότητα του αριθμού) και κάνει
  τις κατάλληλες ενέργειες για να μην μπορεί να εισάγει ο χρήστης νέο αριθμό ή να ανασταλεί η
  λειτουργία του <<enter>>, εμφάνιση του πλήκτρου 'restart' και την εξαφάνιση του πλήκτρου 'check'
  σε περίπτωση ολοκλήρωσης του παιχνιδιού. */
function checkGuess(){
  let userGuess = parseInt(document.querySelector("#new-guess").value);

  if (isNaN(userGuess) || userGuess === null) {
    message.textContent = ' ';
  } else {
    logGuess(userGuess);
    if (userGuess === theGuess || previousGuesses.length === 10) {
      setGameOver();
      restartButton.disabled=false;
      message.textContent = 'Προηγούμενες προσπάθειες: ';
      message.textContent += previousGuesses.join(" ");
    } else if (userGuess < theGuess || userGuess > theGuess) {
      restartButton.disabled=true;
      message.textContent = 'Προηγούμενες προσπάθειες: ';
      message.textContent += previousGuesses.join(" ");
    }
  } 

  processGuess(userGuess);

  document.querySelector('#new-guess').value = "";
  document.querySelector('#new-guess').focus();
}

/* 6.  Να ορίσετε συνάρτηση processGuess(newValue) η οποία καλείται από τη συνάρτηση checkGuess,
 περιέχει τη λογική του παιχνιδιού, ελέγχει αν η τιμή του χρήστη είναι σωστή, ή αν το παιχνίδι έχει
 τελειώσει χωρίς ο χρήστης να έχει βρει τον αριθμό, και επιστρέφει αντίστοιχα την τιμή "win", ή "lost",
 δημιουργεί και εμφανίζει τα κατάλληλα μηνύματα, αλλάζοντας το χρώμα του στοιχείου μηνυμάτων.
 Όλα τα μηνύματα του προγράμματος εμανίζονται από την processGuess().
 Σε περίπτωση που το παιχνίδι δεν έχει ακόμα τελειώσει, η συνάρτηση μπορεί είτε να μην επιστρέφει κάποια ιδιαίτερη τιμή,
 είτε να επιστρέφει κάποια τιμή της επιλογής σας */
function processGuess(userGuess){
  if (isNaN(userGuess)) {
      lowHigh.textContent = 'Δώσε αριθμό!';
      let col = getComputedStyle(root).getPropertyValue('--msg-wrong-color');
      lowHigh.style.backgroundColor = col;
  } else {
    if (userGuess === theGuess) {
      lowHigh.textContent = 'Μπράβο το βρήκες!';
      let colour = getComputedStyle(root).getPropertyValue('--msg-win-color');
      lowHigh.style.backgroundColor = colour;
    } else if (previousGuesses.length === 10) {
      lowHigh.textContent = 'Τέλος παιχνιδιού, έχασες!';
    } else {
      if (userGuess < theGuess) {
        lowHigh.textContent = 'Λάθος, πολύ χαμηλά!' ;
        let col1 = getComputedStyle(root).getPropertyValue('--msg-wrong-color');
        lowHigh.style.backgroundColor = col1;
      } else if (userGuess > theGuess) {
        lowHigh.textContent = 'Λάθος, το ξεπέρασες!';
        let col2 = getComputedStyle(root).getPropertyValue('--msg-wrong-color');
        lowHigh.style.backgroundColor = col2;
      }
    }
  }
}

function setGameOver() {
  newGuess.disabled = true;
  checkButton.disabled = true;
  document.body.appendChild(restartButton);
  restartButton.addEventListener('click', restart);
}

/* 7. Να ορίσετε συνάρτηση restart η οποία καλείται όταν ο χρήστης πατήσει το πλήκτρο
'restart' και επανεκινεί τη διαδικασία */
function restart() {
    message.textContent = '';
    lowHigh.textContent = '';
    document.querySelector("#new-guess").value = "";
    document.querySelector("#message").value = "";
    document.querySelector("#low-high").value = "";
    document.querySelector("#check").value = "";
    document.querySelector("#restart").value = "";
    document.querySelector(":root").value = "";
    previousGuesses = [];
    restartButton.parentNode.removeChild(restartButton);
    newGuess.disabled = false;
    lowHigh.disabled = false;
    checkButton.disabled=false;
    newGuess.focus();
    theGuess = Math.floor(Math.random() * 100) + 1;
}
