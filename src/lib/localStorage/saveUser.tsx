import { User } from '@/types/userTypes';


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
  let data  = localStorage.getItem('users');
  if (data) {
    let users : User[] = JSON.parse(data);
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

const getCurrentUser = (username:string)=>{
  const data = localStorage.getItem('users')
  if(data) {
    let users =  JSON.parse(data)
    const currentUser = users.filter((user : User) => user.username == username);
    return currentUser;
  }else{
    return  null;
  }
}

export { saveUser, logUser, loginUser, getCurrentUser };