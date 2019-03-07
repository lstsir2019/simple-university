import { Component, OnInit } from '@angular/core';
import {MentionService} from '../../../controller/service/mention.service';

@Component({
  selector: 'app-mention-list',
  templateUrl: './mention-list.component.html',
  styleUrls: ['./mention-list.component.css']
})
export class MentionListComponent implements OnInit {

  constructor(private  mentionService: MentionService) { }

  ngOnInit() {
    this.mentionService.findAll();

  }
  public get findAll(){

    return this.mentionService.findAll();
  }
  public get listeMentions() {
    return this.mentionService.listeMention;
  }

  public get mention(){
    return this.mentionService.mentionCreate;
  }
  public deleteMention(mentionsupp) {
    return this.mentionService.deleteMention(mentionsupp);
  }
  public get mention1(){
    return this.mentionService.mentionCreate1;
  }
  public get mention2(){
    return this.mentionService.mentionCreate2;
  }
  public mentionReference(mention){
    return this.mentionService.findByReference(mention)
  }
  public editRefLib(mentionEdit,nvMention){
    return this.mentionService.editReference(mentionEdit,nvMention)
  }
  public editNoteMax(mentionEdit,nvMention){
    return this.mentionService.editNotemax(mentionEdit,nvMention)
  }
  public editNoteMin(mentionEdit,nvMention){
    return this.mentionService.editNotemin(mentionEdit,nvMention)
  }
}
