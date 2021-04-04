import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {WebRequestService} from '../web-request.service'

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export interface WebsiteStatistics {
  websiteId: string,
  chats: number,
  missedChats: number,
  date: string
}


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  displayedColumns: any;
  dataSource: any;
  json_data: any;
  selected_date_range: string[] = [];
  total_chats = 0;
  total_missed_chats = 0;

  constructor(private webRequest: WebRequestService) { }

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  ngOnChanges(){
    
  }
  
  ngOnInit(): void {
    
    this.webRequest.getData().subscribe((res: any) => {
      this.json_data = res;
    })
    this.displayedColumns = ['websiteId', 'date', 'chats', 'missedChats']; 
    
  }

  

  ngDoCheck(){
    this.dataSource = this.json_data
    if(this.dataSource){
      let a = 0;
      let b = 0;
      for(let i =0; i<this.dataSource.length;i++){
        this.dataSource[i].date = new Date(this.dataSource[i].date).toLocaleDateString();
         a += this.dataSource[i].chats;
         b += this.dataSource[i].missedChats;
      }
      this.total_chats = a;
      this.total_missed_chats = b;

    }
    console.log("data => ", this.dataSource);
    if(this.range.value['start'] && this.range.value['end']){
      console.log(new Date(this.range.value['start']).toLocaleDateString(), new Date(this.range.value['end']).toLocaleDateString());

      this.date_range(new Date(new Date(this.range.value['start']).toLocaleDateString()), new Date(new Date(this.range.value['end']).toLocaleDateString()));
    }

    console.log("this is the range => ", this.selected_date_range);
    if(this.selected_date_range.length != 0){
      this.dataSource = this.dataSource.filter((item: any) => {
        return this.selected_date_range.includes(item.date);
      })
      let a = 0;
      let b = 0;
      for(let i = 0; i< this.dataSource.length; i++){
        a += this.dataSource[i].chats;
        b += this.dataSource[i].missedChats;
      }
      this.total_chats = a;
      this.total_missed_chats = b;
    }
    

  }

  date_range(start: any, end: any){
    for(var arr=[],dt=new Date(start); dt<=end; dt.setDate(dt.getDate()+1)){
      arr.push(new Date(dt).toLocaleDateString());
    }
    console.log(arr);
    this.selected_date_range = arr;
    return this.selected_date_range;
  }

  

}
