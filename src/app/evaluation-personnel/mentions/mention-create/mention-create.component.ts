import { Component, OnInit } from '@angular/core';
import {MentionService} from '../../../controller/service/mention.service';

@Component({
  selector: 'app-mention-create',
  templateUrl: './mention-create.component.html',
  styleUrls: ['./mention-create.component.css']
})
export class MentionCreateComponent implements OnInit {

  constructor(private  mentionService: MentionService) { }

  ngOnInit() {
  }
  public get saveMention(){
    return this.mentionService.saveMention();
  }

  public get mention(){
    return this.mentionService.mentionCreate;
  }

}

