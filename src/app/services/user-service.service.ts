// userService.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { User } from '..//user.model'; // Define this based on your backend User entity

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080/auth'; // Replace with your backend API URL

  constructor(private http: HttpClient) { }

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/signup`, user);
  }

  loginUser(email: string, password: string): Observable<string> {
    const loginData = { email, password };
    return this.http.post<any>(`${this.baseUrl}/login`, loginData)
      .pipe(
        map(response => {
          // Assuming the response contains a token
          if (response && response.token) {
            return response.token;
          } else {
            throw new Error('Token not found in the response');
          }
        })
      );
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/update`, user);
  }

  deleteUser(email: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteUser?email=${email}`);
  }

  createBooking(bookingData: any): Observable<any> {
    
    const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Set the Authorization header

    // return this.http.post<any>(`${this.baseUrl}/bookings`, bookingData, { headers }); // Include headers in the request
    // return this.http.post<any>(`http://localhost:8080/api/bookings/createBooking`, bookingData, { headers });
    return this.http.post<any>('http://localhost:8080/api/bookings/createBooking', bookingData, { headers });

  }

  searchBuses(origin: string, destination: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/busSearch?origin=${origin}&destination=${destination}`);
  }
}
