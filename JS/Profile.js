
      const auth = window.firebaseAuth; // Assume Firebase initialized in head
      const db = window.firebaseDb;
      const storage = window.firebaseStorage;

      // Load current profile
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          const data = userDoc.data();
          document.getElementById('profileName').value = data.name;
          document.getElementById('profilePreview').src = data.picture;
        } else {
          window.location.href = 'HOME.html'; // Redirect if not logged in
        }
      });

      // Save profile
      document.getElementById('profileForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const user = auth.currentUser;
        const name = document.getElementById('profileName').value;
        const file = document.getElementById('profilePicture').files[0];

        let pictureUrl = '';
        if (file) {
          const uploadRef = storageRef(storage, 'profiles/' + user.uid + '/' + file.name);
          const uploadTask = uploadBytesResumable(uploadRef, file);
          await new Promise((resolve, reject) => {
            uploadTask.on('state_changed', null, reject, () => {
              getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                pictureUrl = url;
                resolve();
              });
            });
          });
        }

        await updateProfile(user, { displayName: name, photoURL: pictureUrl });
        await setDoc(doc(db, 'users', user.uid), { name, picture: pictureUrl }, { merge: true });

        // Log activity
        logEvent(analytics, 'profile_update');
        await setDoc(doc(db, 'activities', user.uid + '_' + Date.now()), { action: 'profile_update', timestamp: new Date() });

        alert('Profile updated!');
      });
