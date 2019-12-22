import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserModel } from './user-model';
import { ApiResponse } from './api-response';

@Injectable({
    providedIn: 'root'
})

export class ConnectDatabaseService {

    baseUrl = 'http://localhost/vsrg-website';

    constructor(private http: HttpClient) { }

    public login(loginData: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(this.baseUrl + '/login.php', loginData);
    }

    // public getUsers(): Observable<ApiResponse> {
    //     return this.http.post<ApiResponse>(this.baseUrl + '/list.php');
    // }

    // public getUserById(id: number): Observable<ApiResponse> {
    //     return this.http.post<ApiResponse>(this.baseUrl + '/getById.php?id=' + id);
    // }

    public createUser(user: UserModel): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(this.baseUrl + '/insert.php', user);
    }
}
