export const TOGGLE_AUTHENTICATION = 'TOGGLE_AUTHENTICATION';

export const toggleAuthentication = (isAuthenticated) => {
  return {
    type: TOGGLE_AUTHENTICATION,
    payload: isAuthenticated,
  };
};