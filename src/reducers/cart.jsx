// src/reducers/cart.js
export const cartInitialState = [];

const UPDATE_STATE_BY_ACTION = {
  ADD_TO_CART: (state, action) => {
    const productInCartIndex = state.findIndex(item => item.id === action.payload.id);

    if (productInCartIndex >= 0) {
      const newState = structuredClone(state);
      newState[productInCartIndex].quantity += 1;
      return newState;
    }

    return [...state, { ...action.payload, quantity: 1 }];
  },

  REMOVE_FROM_CART: (state, action) => {
    return state.filter(item => item.id !== action.payload.id);
  },

  CLEAR_CART: () => {
    return [];
  }
};

export function cartReducer(state, action) {
  const { type } = action;
  const updateFn = UPDATE_STATE_BY_ACTION[type];
  return updateFn ? updateFn(state, action) : state;
}
