const initialState = {
  loginDropDownIsActive: false,
  navDropDownIsActive: false
}


export default (state=initialState, action) => {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case TOGGLE_LOGIN_DROP_DOWN:
      newState.loginDropDownIsActive = (newState.loginDropDownIsActive) ? false : true;
      break;
    default:
      return state;
  }

  return newState;
}


// const ACTIVATE_LOGIN_DROPDOWN = 'ACTIVATE_LOGIN_DROPDOWN';
// const DEACTIVATE_LOGIN_DROPDOWN = 'DEACTIVATE_LOGIN_DROPDOWN';

// const ACTIVATE_NAV_DROPDOWN = 'ACTIVATE_NAV_DROPDOWN';
// const DEACTIVATE_NAV_DROPDOWN = 'DEACTIVATE_LOGIN_DROPDOWN';

const TOGGLE_LOGIN_DROP_DOWN = 'TOGGLE_LOGIN_DROP_DOWN';


export const toggleLoginDropDown = () => ({
  type: TOGGLE_LOGIN_DROP_DOWN
});

// export const activateLoginDropdown = () => ({
//   type: ACTIVATE_LOGIN_DROPDOWN
// });
//
// export const deactivateLoginDropdown = () => ({
//   type: DEACTIVATE_LOGIN_DROPDOWN
// });
//
// export const activateNavDropdown = () => ({
//   type: ACTIVATE_NAV_DROPDOWN
// });
//
// export const deactivateNavDropdown = () => ({
//   type: DEACTIVATE_NAV_DROPDOWN
// });
