import firebase from "firebase";
const firebaseApp= firebase.initializeApp({
    apiKey: "AIzaSyCstDBMVpRnDQEI2LGIGyFxMlnRRxLx1Ow",
    authDomain: "facebook-messenger-dafcf.firebaseapp.com",
    projectId: "facebook-messenger-dafcf",
    storageBucket: "facebook-messenger-dafcf.appspot.com",
    messagingSenderId: "391512297685",
    appId: "1:391512297685:web:4f890879c0f1dfabda925c",
    measurementId: "G-BDG3D7VYXF"
    }
  );
  const db=firebase.firestore();
  export default db;
  export  {firebaseApp};