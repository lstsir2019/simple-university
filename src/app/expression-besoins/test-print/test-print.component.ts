import { Component, OnInit } from '@angular/core';
import {ExpressionBesoinService} from '../../controller/service/expression-besoin.service';

@Component({
  selector: 'app-test-print',
  templateUrl: './test-print.component.html',
  styleUrls: ['./test-print.component.css']
})
export class TestPrintComponent implements OnInit {

  constructor(private expressionBesoinService:ExpressionBesoinService) { }

  ngOnInit() {
  }


  public printpdf() {
    return this.expressionBesoinService.print();
  }
}
