import axios from 'axios';
import { FilterSet } from '../types/ServiceTypes';
import { User, UserInfo } from '../types/UserTypes';
import { ponerFiltros } from './GeneralService';

export async function getUserList(filtros: FilterSet): Promise<UserInfo[]> {
    const response = await axios.get<UserInfo[]>(
        'http://127.0.0.1:8000/api/v1/user/', ponerFiltros(filtros)
    );
    return response.data;
}



export async function validateUser(user: UserInfo): Promise<UserInfo>  {
    const response = await axios.post<UserInfo>(
        'http://127.0.0.1:8000/user/validation/',
        user
    );
    return response.data
}
export async function createUser(user: UserInfo): Promise<User>  {
    const response = await axios.post<User>(
        'http://127.0.0.1:8000/auth/users/',
        user
    );
    console.log(response);
    return response.data
}
