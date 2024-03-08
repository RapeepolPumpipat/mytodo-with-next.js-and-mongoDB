export const reducer = (state,action) => {
    if (action.type === 'SWITCH') {
        return {...state,isCheck:!state.isCheck}
    } else if (action.type === 'AGE') {
        return {...state,age:state.age + 1}
    }
} 
