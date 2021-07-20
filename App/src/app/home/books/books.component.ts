import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../../services/books.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/services/storage.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.less']
})

export class BooksComponent implements OnInit {

  books: [];

  constructor(
    private booksService: BooksService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private storageService: StorageService
  ) {
  }

  ngOnInit(): void {

    // 執行 get books
    this.getBooksData();

  }

  getBooksData(): void {

    // 讀取 books 列表
    this.booksService.getBooks().subscribe((res) => {
      console.log('books res data', res);
      this.books = JSON.parse(res.body);
      console.log('books res data parse', this.books);
    }, (error) => {
      console.error('error', error);
    });

  }

  // 新增
  goAddDetail () {
    this.router.navigate(['/home/booksdetail'], { queryParams: { isState: JSON.stringify(true) }});
  }
  // 編輯
  goEditDetail (data) {
    console.log('bookbook', data);
    this.router.navigate(['home', 'booksdetail'], { queryParams: { Id: data.id, isState: JSON.stringify(false)}});
  }
  // 刪除
  delBook (id) {
    this.booksService.delBooks(id).subscribe((res) => {
      console.log('delete book success!');
      this.toastr.success('成功', '刪除成功!!');
      this.getBooksData();
    }, (error) => {
      console.error('delete error', error);
    });
  }

}
