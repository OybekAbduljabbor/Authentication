export const acLoading = (boolean) => {
  return {
    type: "LOADING",
    payload: boolean,
  };
};

export const reLoading = (state = false, action) => {
  switch (action.type) {
    case "LOADING":
      return action.payload;
    default:
      return state;
  }
};
