import * as types from './types';
export const fetchTickets = (page,limit,date)=>({
    type:types.FETCH_TICKETS_ASYNC,
    payload:{
        page,
        limit,
        date
    }
})

export const resetFetchTickets = ()=>({
    type:types.FETCH_TICKETS_RESET
})