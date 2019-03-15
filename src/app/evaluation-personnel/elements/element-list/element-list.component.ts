import { Component, OnInit } from '@angular/core';
import {ElementService} from '../../../controller/service/element.service';

@Component({
  selector: 'app-element-list',
  templateUrl: './element-list.component.html',
  styleUrls: ['./element-list.component.css']
})
export class ElementListComponent implements OnInit {

  constructor(private  elementService: ElementService) {
  }

  ngOnInit() {
    this.elementService.findAll();

  }



  public get listelements() {
    return this.elementService.listelements;
  }
  public get element(){
    return this.elementService.elementCreate;
  }
  public  elementByReference(elemRef){
    return  this.elementService.findByReference(elemRef);
  }
  public deleteElement(elemsupp) {
    return this.elementService.deleteElement(elemsupp);
  }
  public editElement(elemedit,nvelem){
    return this.elementService.editReference(elemedit,nvelem);
  }
  public get element1(){
    return this.elementService.elementCreate1;
  }
  public get element2(){
    return this.elementService.elementCreate2;
  }
  public editBarem(elemedit,nvelem){
    return this.elementService.editBarem(elemedit,nvelem);
  }


}

