// Listen for auth status changes - this function fires evertime there is a change
// in the auth status of a user (ie login, logout, etc)
auth.onAuthStateChanged(user => {
  if (user) {
    // Get data
    db.collection('guides').onSnapshot(
      snapshot => {
        setupGuides(snapshot.docs);
        setupUI(user);
      },
      error => {
        console.log(error.message);
      }
    );
  } else {
    setupUI();
    setupGuides([]);
  }
});

// Create New Guide
const createForm = document.getElementById('create-form');

createForm.addEventListener('submit', e => {
  e.preventDefault();

  db.collection('guides')
    .add({
      // title: createForm.title.value
      title: createForm['title'].value,
      content: createForm['content'].value
    })
    .then(() => {
      // Close modal and reset form
      const modal = document.getElementById('modal-create');
      M.Modal.getInstance(modal).close();
      createForm.reset();
    })
    .catch(error => {
      console.log(error.message);
    });
});

// Signup user
const signupForm = document.getElementById('signup-form');

signupForm.addEventListener('submit', e => {
  e.preventDefault();

  // Get user info - look at the signup form that we have a
  // reference to and find an input that has id="signup-email and get its value"
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;

  // Sign up the user to firebase - asynchronous task
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(cred => {
      // console.log(cred.user);
      // Firestore will automatically create this collection if it doesn't exist
      return db
        .collection('users')
        .doc(cred.user.uid)
        .set({
          bio: signupForm['signup-bio'].value
        });
    })
    .then(() => {
      const modal = document.getElementById('modal-signup');
      M.Modal.getInstance(modal).close();
      signupForm.reset();
    });
});

// Logout user
const logout = document.getElementById('logout');

logout.addEventListener('click', e => {
  e.preventDefault();
  auth.signOut();
});

// Login user
const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', e => {
  e.preventDefault();

  // Get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  auth.signInWithEmailAndPassword(email, password).then(cred => {});

  // Close login modal and reset the form
  const modal = document.getElementById('modal-login');
  M.Modal.getInstance(modal).close();
  loginForm.reset();
});
