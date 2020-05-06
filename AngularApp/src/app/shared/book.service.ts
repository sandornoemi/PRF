import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Book } from './book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  selectedBook: Book;
  books: Book[];
  //readonly baseUrl = 'http://localhost:3000/books';

  constructor(private http: HttpClient) { }

  postBook(book: Book) {
    const httpOptions = {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    //return this.http.post(this.baseUrl, book);
    return this.http.post('http://localhost:3000/books', book);
  }

  getBookList() {
    const httpOptions = {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    //return this.http.get(this.baseUrl);
    return this.http.get('http://localhost:3000/books');
  }

  putBook(book: Book) {
    const httpOptions = {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    //return this.http.put(this.baseUrl + `/${book._id}`, book);
    return this.http.put('http://localhost:3000/books' + `/${book._id}`, book);
  }

  deleteBook(_id: string) {
    const httpOptions = {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    //return this.http.delete(this.baseUrl + `/${_id}`);
    return this.http.delete('http://localhost:3000/books' + `/${_id}`);
  }
}
