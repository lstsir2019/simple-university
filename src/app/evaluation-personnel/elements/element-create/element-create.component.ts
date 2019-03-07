import { Component, OnInit } from '@angular/core';
import {ElementService} from '../../../controller/service/element.service';

@Component({
  selector: 'app-element-create',
  templateUrl: './element-create.component.html',
  styleUrls: ['./element-create.component.css']
})
export class ElementCreateComponent implements OnInit {

  constructor(private  elementService: ElementService) { }

  ngOnInit() {
  }
  public get element() {
    return this.elementService.elementCreate;
  }
  public get saveElement() {
    console.log(this.element)
    return this.elementService.saveElement();
  }

}

