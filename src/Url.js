// const BACKEND_URL= "https://difficult-gray-waistcoat.cyclic.cloud"
const BACKEND_URL= "http://localhost:8000"
// const BACKEND_URL= "http://0.0.0.0:8000/"

export const sign_in = `${BACKEND_URL}/api/user/login/`;
export const signup = `${BACKEND_URL}/api/user/register/`;
export const refresh = `${BACKEND_URL}/api/user/refresh/`;

 
export const ALL_COMPS = `${BACKEND_URL}/api/competition/`;
export const MY_COMPS = `${BACKEND_URL}/api/competition/myComp/`;
export const SHOW_MY_REQ = `${BACKEND_URL}/api/competition/showMyReq/`;
export const viewApp = `${BACKEND_URL}/api/user/`;
export const DELETE_COMP = `${BACKEND_URL}/api/competition/`;
export const POST_COMP = `${BACKEND_URL}/api/competition/`;
export const APPLY_COMP = `${BACKEND_URL}/api/competition/`;
export const ACCEPT_COMP = `${BACKEND_URL}/api/competition/`;
export const COMP_STATUS = `${BACKEND_URL}/api/competition/`;
export const REMOVE_COMP = `${BACKEND_URL}/api/competition/`; //
export const REMOVE_REQ = `${BACKEND_URL}/api/competition/`; //
