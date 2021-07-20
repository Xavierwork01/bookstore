import { Component, OnInit, Input } from '@angular/core';
import { StorageService } from 'src/services/storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit {

	loginState = false;
	userInfo: any;

	constructor(
		private storageService: StorageService,
		private router: Router,
		private toastr: ToastrService
	) { }

	ngOnInit(): void {

		// 判斷是否登入改編navbar資訊
		if (this.storageService.localget('userinfo')) {
			this.userInfo = JSON.parse(this.storageService.localget('userinfo')) || '';
			console.log(this.userInfo);
			this.loginState = true;
		}
	}

	removeUserInfo(): void {
		this.storageService.localremove('userinfo');
		this.toastr.success('成功', '已登出!');
		this.router.navigate(['/login']);
	}

}
