import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {

  userRegister: any = {
    account: '',
    password: '',
    name: '',
    gender: '',
    userphoto: '',
    phone: '',
    email: '',
    access: '',
  };

  // gender 性別
  genderOption = ['M', 'F'];

  // access 權限
  accessOption = [1, 2];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  //註冊service
  createUser(){
    this.userService.createUser(this.userRegister).subscribe((res) => {
      console.log('Create user data', res.body);
      this.toastr.success('註冊成功', '成功');
      this.router.navigate(['/login']);
    }, (error) => {
      console.error('create error', error.error);
      this.toastr.error(error.error, '失敗');
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
        this.userRegister.userphoto = reader.result;
    };


}

}
