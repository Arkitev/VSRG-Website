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

    public createUser(user: UserModel): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(this.baseUrl + '/insert_user.php', user);
    }

    public getUserData(jwt: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(this.baseUrl + '/get_user_data.php', jwt);
    }

    public editUserData(userData: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(this.baseUrl + '/edit_user_data.php', userData);
    }

    public changePassword(userPasswordData: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(this.baseUrl + '/change_password.php', userPasswordData);
    }

    public insertScore(submitScoreData: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(this.baseUrl + '/insert_score.php', submitScoreData);
    }

    public getScores(settingScoreData: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(this.baseUrl + '/get_scores.php', settingScoreData);
    }

    public manageScore(score: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(this.baseUrl + '/manage_scores.php', score);
    }

    public getUsers(): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(this.baseUrl + '/get_users.php');
    }
}
