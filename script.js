// Snack 1
// Ottieni il titolo di un post con una Promise.

// Crea una funzione getPostTitle(id) che accetta un id e restituisce una Promise che recupera il titolo di un post dal link https://dummyjson.com/posts/{id}

function getPostTitle(id) {
  return new Promise((resolve, reject) => {
    fetch(`https://dummyjson.com/posts/${id}`)
      .then(response => response.json())
      .then(obj => resolve(obj.title))
      .catch(reject)
  })
}

getPostTitle(1)
  .then(title => console.log(title))
  .catch(error => console.error(error))

// 🎯 Bonus: Ottieni l'intero post con l'autore
// Crea una funzione getPost(id) che recupera l'intero post. Concatena una seconda chiamata che aggiunge una proprietà user che contiene i dati dell'autore, recuperati dalla chiamata https://dummyjson.com/users/{post.userId}.

function getPost(id) {
  return new Promise((resolve, reject) => {
    fetch(`https://dummyjson.com/posts/${id}`)
      .then(response => response.json())
      .then(post => {
        fetch(`https://dummyjson.com/users/${post.userId}`)
          .then(response => response.json())
          .then(user => resolve({ ...post, user }))
          .catch(reject)
      })
      .catch(reject)
  })
}

getPost(1)
  .then(post => console.log(post))
  .catch(error => console.error(error));

// Snack 2
// Crea la funzione lanciaDado() che restituisce una Promise che, dopo 3 secondi, genera un numero casuale tra 1 e 6. Tuttavia, nel 20% dei casi, il dado si "incastra" e la Promise va in reject.

// function lanciaDado() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const probabilitaErrore = Math.random()
//       if (probabilitaErrore < 0.2) {
//         reject("Il dado si è incastrato!");
//       } else {
//         const risultato = Math.floor(Math.random() * 6) + 1
//         resolve(risultato);
//       }
//     }, 3000);
//   });
// } 

// 🎯 Bonus: HOF con closure per memorizzare l'ultimo lancio
// Modifica la funzione in creaLanciaDado(), che restituisce una closure che memorizza l'ultimo risultato. Se il numero esce due volte di fila, stampa "Incredibile!".
function creaLanciaDado() {

  let ultimoRisultato = null;

  return function lanciaDado() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const probabilitaErrore = Math.random()
        if (probabilitaErrore < 0.2) {
          reject("Il dado si è incastrato!");
        } else {
          const risultato = Math.floor(Math.random() * 6) + 1
          if (risultato === ultimoRisultato) {
            console.log("Incredibile!");
          }
          ultimoRisultato = risultato;
          resolve(risultato);
        }
      }, 1000);
    });
  };
}

const lanciaDado = creaLanciaDado();

lanciaDado()
  .then(numero => {
    console.log("Il dado ha mostrato:", numero);
    return lanciaDado()
  })
  .then(numero => console.log("Il dado ha mostrato:", numero))
  .catch(errore => console.error("Errore:", errore));
