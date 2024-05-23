 // Array para almacenar la secuencia de teclas
 let keysPressed = [];

 // La secuencia correcta
 const correctSequence = ['1', '2', '3'];
 
 // Escuchar los eventos de teclado
 document.addEventListener('keydown', function(event) {
     keysPressed.push(event.key);
 
     // Comprobar si la secuencia actual coincide con la secuencia correcta
     if (keysPressed.join('').includes(correctSequence.join(''))) {
         document.querySelector('.content-form-admin').style.display = 'block';
         keysPressed = []; // Resetear la secuencia
     }
 
     // Limitar el tamaño del array a la longitud de la secuencia correcta
     if (keysPressed.length > correctSequence.length) {
         keysPressed.shift();
     }
 });
 
 // Función de login con Firebase
 function login() {
     var email = document.getElementById('name-form-admin').value;
     var password = document.getElementById('password').value;
     
     firebase.auth().signInWithEmailAndPassword(email, password)
         .then((userCredential) => {
             // Redirigir al panel de administración
             window.location.href = "administrable.html";
         })
         .catch((error) => {
             var errorCode = error.code;
             var errorMessage = error.message;
             alert("Error: " + errorMessage);
         });

 };

    // Evento de logout
    document.getElementById('logout').addEventListener('click', (e) => {
        e.preventDefault();
        firebase.auth().signOut().then(() => {
            window.location.href = "index.html";
        }).catch((error) => {
            alert("Error al cerrar sesión: " + error.message);
        });
    });