import { User } from '@/types/userTypes';
import { initializeApp } from 'firebase/app';
import { child, get, getDatabase, ref, set } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';
import { firebaseConfig } from '../appwrite/firebase';
const app = initializeApp(firebaseConfig)

const saveUser = (values: User) => {
  let storedData = localStorage.getItem('users');

  if (storedData) {
    const parsedData: User[] = JSON.parse(storedData);
    parsedData.push(values);
    storedData = JSON.stringify(parsedData);
    localStorage.setItem('users', storedData);
  } else {
    const data = JSON.stringify([values]);
    localStorage.setItem('users', data);
  }
};

const logUser = (values: User) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn')
  isLoggedIn ? JSON.parse(isLoggedIn) : false;
  if (isLoggedIn.isLogged) {
    return false
  } else {
    localStorage.setItem('isLoggedIn', JSON.stringify({ isLogged: true, username: values.username }));
  }

  return isLoggedIn;
};

const loginUser = (values: User) => {
  let data = localStorage.getItem('users');
  if (data) {
    let users: User[] = JSON.parse(data);
    let exists = false;

    for (const user of users) {
      if (user.username === values.username) {
        exists = true;
        console.log('welcome');
        return user;
      }
    }

    if (!exists) {
      console.log('User does not exist');
      return false
    }
  }
};

const getCurrentUser = (username: string) => {
  const data = localStorage.getItem('users')
  if (data) {
    let users = JSON.parse(data)
    const currentUser = users.filter((user: User) => user.username == username);
    return currentUser;
  } else {
    return null;
  }
}

const uuid = uuidv4();
const database = getDatabase();
const dbRef = ref(getDatabase());

const loginUsername = async (username) => {
  try {
    const snapshot = await get(child(dbRef, `users`));
    if (snapshot.exists()) {
      const data = snapshot.val();
      const dataArray = Object.entries(data).map(([key, value]) => ({ id: key, ...value }));
      const userData = dataArray.find((item) => item.username === username);
      return userData;
    } else {
      console.log("No data available");
    }
  } catch (error) {
    console.error(error);
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("reduxState", serializedState);
  } catch (error) {
    console.error("Error saving state to localStorage:", error);
  }
};

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error("Error loading state from localStorage:", error);
    return undefined;
  }
};




export { saveUser, logUser, loginUser, getCurrentUser, loginUsername, loadState, saveState };