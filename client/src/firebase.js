// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getStorage } from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCDXX-Xp_hvxe5x2XoyPUMwlR75iMQMaeU',
  authDomain: 'baseballcardz-56aac.firebaseapp.com',
  projectId: 'baseballcardz-56aac',
  storageBucket: 'baseballcardz-56aac.appspot.com',
  messagingSenderId: '7142768987',
  appId: '1:7142768987:web:cff36e857b1c5f60c3da7e',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
