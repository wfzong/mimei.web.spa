//Getters 可以认为是 store 的计算属性
//Getters 接受 state 作为其第一个参数
//Getters 也可以接受其他 getters 作为第二个参数

export const getMyToken = (s) => {
    return s.token
}
export const getUserInfo = (s) => {
    return s.userInfo
}
export const initedLogin = s => {
    return s.initLogin
}