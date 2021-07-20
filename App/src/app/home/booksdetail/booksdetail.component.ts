import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BooksService } from 'src/services/books.service';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/services/storage.service';

@Component({
    selector: 'app-booksdetail',
    templateUrl: './booksdetail.component.html',
    styleUrls: ['./booksdetail.component.less']
})

export class BooksdetailComponent implements OnInit {

    // book get info
    bookinfo: any;

    // books category
    bookcategory = ['Computers', 'Sports', 'News', 'Fictions', 'Comics'];

    // create book edit info
    editInfo: any = {
        photo: '',
        bookName: '',
        price: '',
        category: '',
        author: ''
    };

    // input edit info
    bookEditInfo: any = {};

    // get book id
    bookId: string;

    // 判斷 add => true 還是 edit => false
    isState: any = false;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private booksService: BooksService,
        private toastr: ToastrService,
        private storageService: StorageService
    ) {
    }



    ngOnInit(): void {

        this.route.queryParams.subscribe((queryParams) => {

            console.log('queryParams content', queryParams);
            this.isState = JSON.parse(queryParams.isState);
            console.log('isState ', this.isState);
            this.bookId = queryParams.Id;

            // 判斷是否為編輯
            if (!this.isState) {

                this.getIdBook(this.bookId);

            } else {

                this.bookEditInfo = Object.assign({}, this.editInfo);

            }

        });

    }

    // 上傳圖片格式轉換 base64
    changePhoto(event){

        console.log('files photo', event.target.files);
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = () => {
            console.log('file format base64', reader.result);
            this.bookEditInfo.photo = reader.result;
        };


    }

    // id 讀取單筆資料
    getIdBook(id){

        this.booksService.getBooksId(id).subscribe((res) => {
            console.log('getidbook res data', res.body);
            this.bookinfo = JSON.parse(res.body);
            this.bookEditInfo = JSON.parse(res.body);
        }, (error) => {
            console.error('getidbook error', error);
        });

    }


    // 重置資料
    resetInfo(){
        console.log('start reset');
        // 將原始資料再給一次編輯資料
        this.bookEditInfo = Object.assign({}, this.bookinfo);

    }

    // 清除
    clearInfo(){

        this.bookEditInfo = Object.assign({}, this.editInfo);

    }

    // 儲存
    saveInfo(){
        console.log('save before bookinfo', this.bookEditInfo);

        if (this.isState){

            // post
            this.booksService.postBooks(this.bookEditInfo).subscribe((res) => {
                console.log('post books data', res.body);
                this.toastr.success('成功', '新增成功!!');
                this.router.navigate(['/home/bookslist']);
            }, (errors) => {
                console.error('post errors', errors);
                this.toastr.error('失敗', '新增失敗!!');
            });

        } else {

            // put
            this.booksService.putBooks(this.bookEditInfo.id, this.bookEditInfo).subscribe((res) => {
                console.log('update books data', res.body);
                this.toastr.success('成功', '更新成功!!');
                this.router.navigate(['/home/bookslist']);

            }, (errors) => {
                console.error('update errors', errors);
                this.toastr.error('失敗', '更新失敗!!');
            });

        }

    }

}
