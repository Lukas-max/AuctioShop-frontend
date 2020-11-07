import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';
import { Location } from '@angular/common';
import {ClientOrder} from '../../../products/model/clientOrder';

@Component({
  selector: 'app-items-purchased',
  templateUrl: './items-purchased.component.html',
  styleUrls: ['./items-purchased.component.css']
})
export class ItemsPurchasedComponent implements OnInit {
  order: ClientOrder;

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location) { }

  ngOnInit(): void {
    this.activatedRoute
      .paramMap
      .pipe(map(() => window.history.state.order))
      .subscribe(data => {
      this.order = data;
    });
  }

  public goBack(){
    this.location.back();
  }
}
