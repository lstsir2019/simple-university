import {Component, OnInit} from '@angular/core';
import {BudgetService} from '../../../controller/service/budget.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {


  constructor(private budgetService: BudgetService) {
  }
  ngOnInit() {
   // this.sizeList();
  }

  public get budgetFaculte(){
    return this.budgetService.budgetFacultePrincipal;
  }

  public sizeList(){
   
   // this.budgetService.budgetFacultePrincipal.budgetProjetVos.forEach(function (value) {
   //
   //     value.budgetSousProjetVos.forEach(function (value) {
   //
   //     });
   // });
   //
   //  for (var i = 0; i <this.budgetService.budgetFacultePrincipal.budgetProjetVos.length; i++) {
   //    for (var j = 0; j <this.budgetService.budgetFacultePrincipal.budgetProjetVos[i].budgetSousProjetVos.length ; j++) {
   //      this.rep1++;
   //    }
   //  }
   //  console.log("haaaaaaaaaaaaaaaaaaaaaaa"+this.rep1);


   }
  // public get rep():Array<number>{
  //   return this.budgetService.values;
  // }


  saveAll() {
    this.budgetService.confirmeBudgetFaculte();
  }
}
