import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUser } from '../interfaces/IUser';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
  
};
const apiUrl = 'http://localhost:3000/api';

@Injectable()
export class ApiService {

    constructor(private http: HttpClient) { }

    getAllUsers(page: number, limit: number = 20) {
        return this.http.post(apiUrl + '/User/searchAll', {page: page, limit: limit}, httpOptions);
    }

    getAllUsersWithFilter(filter: string, type: number) {
        return this.http.post(apiUrl + '/User/searchAllWithFilter', {filter: filter, type: type}, httpOptions);
    }

    getOneUser(id: number) {
        return this.http.get(apiUrl + '/User/' + id, httpOptions);
    }

    deleteUser(id: number) {
        return this.http.post(apiUrl + '/User/delete', {id_usuario: id} , httpOptions);
    }

    updateUser(data: IUser) {
        return this.http.put(apiUrl + '/User/update', data, httpOptions);
    }

    createUser(data: IUser) {
        return this.http.post(apiUrl + '/User/create', data, httpOptions);
    }
}