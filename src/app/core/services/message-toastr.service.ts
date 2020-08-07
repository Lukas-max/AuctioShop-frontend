import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MessageToastrService {

  constructor(private toastrService: ToastrService) { }

  public success(message: string){
    this.toastrService.success(message);
  }
}
