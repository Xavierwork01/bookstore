import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from '../../services/storage.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit, OnDestroy {

	// login 資訊
	userInfo: any = {
		account: '',
		password: ''
	};

	constructor(
		private userService: UserService,
		private toastr: ToastrService,
		private storageService: StorageService,
		private router: Router,
		private route: ActivatedRoute,
	) { }
	ngOnDestroy(): void {
		localStorage.removeItem('userinfo');
	}

	ngOnInit(): void {


	}

	login(): void {
		console.log('user info', this.userInfo);


		this.userService.login(this.userInfo.account, this.userInfo.password).subscribe((res) => {
			console.log('res body login', res);
			this.toastr.success('成功', '登入成功!!');
			localStorage.setItem('userinfo', res.body);
			const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
			console.log(returnUrl, this.route.snapshot.url);
			if (returnUrl) {
				this.router.navigateByUrl(returnUrl);
			} else {
				this.router.navigate(['/home/bookslist']);
			}
		}, (error) => {
			console.error('login error', error);
			this.toastr.error('登入失敗!!', '失敗');
		});


	}
}
