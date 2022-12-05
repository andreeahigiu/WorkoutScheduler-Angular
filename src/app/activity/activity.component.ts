import { Component, Input, OnInit, DoCheck, Output, EventEmitter, OnDestroy, OnChanges } from '@angular/core';
import { ActivitiesService } from '../activities.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit, DoCheck, OnChanges {

  @Input() selectedTab!: string;

  storedActivity = {
    Day:'',
    Morning: {
      Activity:'',
      Start:'',
      End:''
    },
    Evening: {
      Activity:'',
      Start:'',
      End:''
    }
  };

  defaultActivityMorning:string ='';
  defaultStartMorning='';
  defaultEndMorning='';
  defaultActivityEvening='';
  defaultStartEvening='';
  defaultEndEvening='';
  selectedDay:any;

  constructor(private activitiesService: ActivitiesService) { }

  ngOnInit(): void {

    this.storedActivity.Day = this.selectedTab;
    this.selectedDay = this.activitiesService.activities.find(e => e.Day === this.selectedTab);



  }

  ngDoCheck(){

    
  }


  onChangeStart(event: any, timeOfDay:string){

    if(timeOfDay === 'Morning'){
      this.storedActivity.Morning.Start = event.target.value;
      this.activitiesService.addActivity(this.selectedTab, this.storedActivity);

    } else {
      this.storedActivity.Evening.Start = event.target.value;
      this.activitiesService.addActivity(this.selectedTab, this.storedActivity);
    }

  }

  onChangeEnd(event:any, timeOfDay: string){
    if(timeOfDay === 'Morning'){
      this.storedActivity.Morning.End = event.target.value;
      this.activitiesService.addActivity(this.selectedTab, this.storedActivity);


    } else {
      this.storedActivity.Evening.End = event.target.value;
      this.activitiesService.addActivity(this.selectedTab, this.storedActivity);

    }
    
    //Am incercat asa , dar nu merge. De ce?
    //console.log('trying: ', typeof(this.storedActivity[timeOfDay as keyof typeof this.storedActivity].End));
    
  }

  onChangeSelect(event:any, timeOfDay:string){
    if(timeOfDay === 'Morning'){
      this.storedActivity.Morning.Activity = event.target.value;
      this.activitiesService.addActivity(this.selectedTab, this.storedActivity);

    } else {
      this.storedActivity.Evening.Activity = event.target.value;
      this.activitiesService.addActivity(this.selectedTab, this.storedActivity);

    }
    console.log("this.selectedDay:  ", this.selectedDay);

  }

  ngOnChanges() {
    console.log("what's in service:  ", this.activitiesService)
    this.storedActivity = 
    {
      Day:'',
      Morning: {
        Activity:'',
        Start:'',
        End:''
      },
      Evening: {
        Activity:'',
        Start:'',
        End:''
      }
    };

    if(this.activitiesService.activities.find(e => e.Day === this.selectedTab) != undefined) {
      this.storedActivity = this.activitiesService.activities.find(e => e.Day === this.selectedTab)!;
      console.log("from service: ", this.activitiesService.activities.find(e => e.Day === this.selectedTab));

    }

    console.log("selected tab: ", this.selectedTab);
    
    this.storedActivity.Day = this.selectedTab;
    this.selectedDay = this.activitiesService.activities.find(e => e.Day === this.selectedTab);
    console.log("this.selectedDay:  ", this.selectedDay);

    if(this.selectedDay){
      this.defaultActivityMorning = this.selectedDay.Morning.Activity;
      this.defaultStartMorning = this.selectedDay.Morning.Start;
      this.defaultEndMorning = this.selectedDay.Morning.End;
      this.defaultActivityEvening = this.selectedDay.Evening.Activity;
      this.defaultStartEvening = this.selectedDay.Evening.Start;
      this.defaultEndEvening = this.selectedDay.Evening.End;

  } else {
    this.defaultActivityMorning = "";
    this.defaultStartMorning = "";
    this.defaultEndMorning = ""
    this.defaultActivityEvening = "";
    this.defaultStartEvening = "";
    this.defaultEndEvening = "";
  }

  }

}
