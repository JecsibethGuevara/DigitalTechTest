
const saveUser = (values: object) =>{

    //get user object
    let storedData = localStorage.getItem('users')
    console.log(storedData, '1')
    if (storedData) {
      storedData = JSON.parse(storedData)
      storedData.push(values)
      storedData =  JSON.stringify(storedData)
      localStorage.setItem('users', storedData)
    }else{
      let data = JSON.stringify([values])
      localStorage.setItem('users', data)
    }
}
const logUser = (values: object) =>{
    let isLoggedIn =  JSON.parse(localStorage.getItem('isLoggedIn'))
    isLoggedIn && isLoggedIn.isLogged ? 
        console.log('error in system') 
        : 
        localStorage.setItem('isLoggedIn', JSON.stringify({isLogged : true, username: values.username}))

    return isLoggedIn
}

export {saveUser, logUser};