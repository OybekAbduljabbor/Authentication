// action token

export const acToken = (token) => {
  return {
    type: "AC_TOKEN",
    token,
  };
};

// reducer token

export const reToken = (state = "", action) => {
  switch (action.type) {
    case "AC_TOKEN":
      return {
        token: action.token,
      };
    default:
      return state;
  }
};
