import * as types from './types'
export const login = (user)=>({
    type: types.LOGIN_ASYNC,
    payload:user 
})
export const resetLogin = ()=>({
    type: types.RESET_LOGIN
})
export const updatePassword = (passwords)=>({
    type: types.CHANGE_PASSWORD_ASYNC,
    payload: passwords
})
export const resetUpdatePassword = ()=>({
    type: types.CHANGE_PASSWORD_RESET
})