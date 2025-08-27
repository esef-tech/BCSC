
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js';
      const auth = window.firebaseAuth;
      const db = window.firebaseDb;

      onAuthStateChanged(auth, (user) => {
        if (!user) {
          window.location.href = 'HOME.html'; // Redirect if not logged in
        } else {
          // Real-time listener for activities
          onSnapshot(collection(db, 'activities').where('userId', '==', user.uid), (snapshot) => {
            const tbody = document.querySelector('#activityTable tbody');
            tbody.innerHTML = '';
            snapshot.forEach((doc) => {
              const data = doc.data();
              const row = `<tr>
                <td>${data.action}</td>
                <td>${data.timestamp.toDate().toLocaleString()}</td>
                <td>${data.page || ''}</td>
              </tr>`;
              tbody.innerHTML += row;
            });
          });
        }
      });
    