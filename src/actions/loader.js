export const startLoading = (account) => {
  return {
    type: 'START_LOADING',
    account
  };
};

export const stopLoading = (account) => {
  return {
    type: 'STOP_LOADING',
    account
  };
};