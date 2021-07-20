import { Injectable } from '@angular/core';
import { ToastrService, IndividualConfig } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class ToastService {

    constructor(
        private toastr: ToastrService
    ) {}

    success(title, message){
        this.toastr.success(message, title);
    }

    error(title, message){
        this.toastr.error(message, title);
    }

}
