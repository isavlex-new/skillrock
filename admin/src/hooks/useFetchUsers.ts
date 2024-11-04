import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./useTypedStore";
import { fetchUsers } from "../features/users/usersThunk";


export function useFetchUsers() {

   const dispatch = useAppDispatch();

   const { users, status, error } = useAppSelector(state => state.users);

   useEffect(() => {
     if (status === 'idle') {
        dispatch(fetchUsers());
     }
   }, [status, dispatch]);

   return { users, status, error };

}