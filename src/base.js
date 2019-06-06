import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyCjfK5X9CVny_d34jr9I1Nsya5Hp7dnN7A',
  authDomain: 'catch-of-the-day-rdk.firebaseapp.com',
  databaseURL: 'https://catch-of-the-day-rdk.firebaseio.com',
  projectId: 'catch-of-the-day-rdk'
});

const base = Rebase.createClass(firebaseApp.database());

// named export
export { firebaseApp };

// default module.exports =
export default base;
