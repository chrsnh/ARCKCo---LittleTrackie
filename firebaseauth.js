// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js"
import { getFirestore, setDoc, doc, addDoc, collection } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js"

const firebaseConfig = {
    apiKey: "AIzaSyBdhIUW6A6hTruM2_vGmPOlmjK-KeMc2o8",
    authDomain: "arck-co---little-trackie.firebaseapp.com",
    projectId: "arck-co---little-trackie",
    storageBucket: "arck-co---little-trackie.appspot.com",
    messagingSenderId: "851329689304",
    appId: "1:851329689304:web:d4873da9ffcca8561a59ad"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'en'
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

function showMessage(message, divId) {
    var messageDiv=document.getElementById(divId);
    messageDiv.style.display="block";
    messageDiv.innerHTML=message;
    messageDiv.style.opacity=1;
    setTimeout(function(){
        messageDiv.style.opacity=0;
    }, 5000);
}

// ================================================== SIGN UP ================================================== //

const signUp=document.getElementById('submitSignUp');
signUp.addEventListener('click', (event)=> {
    event.preventDefault();
    const email=document.getElementById('rEmail').value;
    const password=document.getElementById('rPassword').value;
    const firstname=document.getElementById('fName').value;
    const lastname=document.getElementById('lName').value;


    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
        const user=userCredential.user;
        const userData={
            email: email,
            firstname: firstname,
            lastname: lastname
        };
        showMessage('Account Created Successfully!', 'signUpMessage');
        const docRef=doc(db, "users", user.uid);
        setDoc(docRef, userData)
        .then(()=> {
            window.location.href='index.html';
        })
        .catch((error)=>{
            console.error("error writing document", error);
        });
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode=='auth/email-already-in-use'){
            showMessage('Email Address Already Exists !!!', 'signUpMessage');
        }
        else {
            showMessage('unable to create User!', 'signUpMessage');
        }
    })
});

// ================================================== SIGN IN ================================================== //

const signIn=document.getElementById('submitSignIn');
signIn.addEventListener('click', (event)=>{
   event.preventDefault();
   const email=document.getElementById('email').value;
   const password=document.getElementById('password').value;
   const auth=getAuth();

   signInWithEmailAndPassword(auth, email,password)
   .then((userCredential)=>{
       showMessage('login is successful!', 'signInMessage');
       const user=userCredential.user;
       localStorage.setItem('loggedInUserId', user.uid);
       window.location.href='homePage.html';
   })
   .catch((error)=>{
       const errorCode=error.code;
       if(errorCode==='auth/invalid-credential'){
           showMessage('Incorrect Email or Password!', 'signInMessage');
       }
       else{
           showMessage('Account does not Exist!', 'signInMessage');
       }
   });
});


const googleLogin = document.getElementById('google-login-btn');
googleLogin.addEventListener('click', function(){
    signInWithPopup(auth, provider)
    .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        console.log(user);
        window.location.href='homePage.html';

    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });
});


/*
const addClass = document.getElementById('addButton');
addClass.addEventListener('click', (event) => {
    event.preventDefault();


    const preSchoolV =document.getElementById('preSchool').value;
    const sectionNameV = document.getElementById('sectionName').value;
    const scheduleV = document.getElementById('schedule').value;

    addDoc(collection(db, 'classrooms'), {
        preSchool: preSchoolV,
        sectionName: sectionNameV,
        schedule: scheduleV
    })

    alert('Classroom added');

});

*/

