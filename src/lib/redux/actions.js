export const setFilter = (newFilter) => ({
    type: 'SET_FILTER',
    payload: newFilter,
  });

  export const setUser = (user) => ({
    type: 'SET_USER',
    payload: user,
  });
  
  export const clearUser = () => ({
    type: 'CLEAR_USER',
  });