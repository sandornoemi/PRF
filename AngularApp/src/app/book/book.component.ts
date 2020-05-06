import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { BookService } from '../shared/book.service';
import { Book } from '../shared/book.model';

declare var M: any;

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
  providers: [BookService]
})
export class BookComponent implements OnInit {

  constructor(public bookService: BookService) { }

  ngOnInit(): void {
    this.resetForm();
    this.refreshBookList();
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }
    this.bookService.selectedBook = {
      _id: "",
      title: "",
      author: "",
      publisher: "",
      isbn: "",
      numberOfPages: null
    }
  }

  onSubmit(form: NgForm) {
    if (form.value._id == "") {
      this.bookService.postBook(form.value).subscribe((response) => {
        //this.resetForm(form);
        //this.refreshBookList();
        M.toast({ html: 'Saved successfully', classes: 'rounded' });
      });
    }
    else {
      this.bookService.putBook(form.value).subscribe((response) => {
        //this.resetForm(form);
        //this.refreshBookList();
        M.toast({ html: 'Updated successfully', classes: 'rounded' });
      });
    }
    this.resetForm(form);
    this.refreshBookList();
  }

  refreshBookList() {
    this.bookService.getBookList().subscribe((response) => {
      this.bookService.books = response as Book[];
    });
  }

  onEdit(book: Book) {
    this.bookService.selectedBook = book;
  }

  onDelete(_id: string, form: NgForm) {
    if(confirm('Are you sure to delete this book?') == true) {
      this.bookService.deleteBook(_id).subscribe((response) => {
        this.refreshBookList();
        this.resetForm(form);
        M.toast({ html: 'Successfully deleted!', classes: 'rounded'});
      });
    }
  }

}
