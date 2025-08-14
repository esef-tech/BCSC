
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyC2ENceaxazqMoWnUKy1boS79hrwk4LZmk",
    authDomain: "best-coach.firebaseapp.com",
    projectId: "best-coach",
    storageBucket: "best-coach.firebasestorage.app",
    messagingSenderId: "1031414210163",
    appId: "1:1031414210163:web:2fe06599bfa4fe5c2cd406",
    measurementId: "G-N36J34DD8Q"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  //Inputs
  const emailInput = document.getElementById("email").value;
  const passwordInput = document.getElementById("password").value;


//Submit button
  const submitButton = document.getElementById("submit");
  submitButton.addEventListener("click", function(event){
    event.preventDefault();
  alert(5)
  })
