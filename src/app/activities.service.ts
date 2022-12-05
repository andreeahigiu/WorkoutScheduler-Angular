import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {
  activities= [
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
    }, 

  ];
  hoursTotal=0;
  minTotal=0;

  hourMorning=0;
  hourMorning1:any; //when activity ends
  hourMorning2:any; //when activity starts
  minMorning1:any;
  minMorning2:any;
  minMorning=0;

  hourEvening=0;
  hourEvening1:any; //when activity ends
  hourEvening2:any; //when activity starts
  minEvening1:any;
  minEvening2:any;
  minEvening=0;



  constructor() {
    
   }

   addActivity(day: string, receivedActivity: any){
    console.log("day in service: ", day);
    
    const index = this.activities.findIndex((e: any) => e.Day === day)
    if ( index > -1){
      this.activities[index] = receivedActivity;
    } else {
      this.activities.push(receivedActivity);
    }

    console.log("in service activity: ", this.activities);
    
   }

   gethourMorningsTotal() {
    this.activities.forEach(element => {
      console.log( "in service end: ", element.Morning.End);

      if(element.Morning.Start != '' && element.Morning.End != '') {
        //Morning Time
      if(element.Morning.End.slice(0, 1) === '0'){
        this.hourMorning1 = element.Morning.End.slice(1, 2)
      } else{
        this.hourMorning1 = element.Morning.End.slice(0, 2)
      }

      if(element.Morning.Start.slice(0, 1) === '0'){
        this.hourMorning2 = element.Morning.Start.slice(1, 2)
      } else{
        this.hourMorning2 = element.Morning.Start.slice(0, 2)
      }

      if(element.Morning.End.slice(3, -1) === '0'){
        this.minMorning1 = element.Morning.End.slice(4)
      } else{
        this.minMorning1 = element.Morning.End.slice(3)
      }

      if(element.Morning.Start.slice(3, -1) === '0'){
        this.minMorning2 = element.Morning.Start.slice(4)
      } else{
        this.minMorning2 = element.Morning.Start.slice(3)
      }
      console.log("orele: "+ this.hourMorning1+' '+this.minMorning1+' '+this.hourMorning2+ ' '+this.minMorning2);

      this.hourMorning = Number(this.hourMorning1) - Number(this.hourMorning2);
      this.minMorning = Number(this.minMorning1) - Number(this.minMorning2);
      console.log("minMorningute: ", this.minMorning);
      
      if(this.minMorning < 0){
        this.minMorning = 60 + this.minMorning;
        this.hourMorning--;
      }


      console.log("hourMorning: ",this.hourMorning," minMorning: ", this.minMorning);

      this.hoursTotal = this.hoursTotal + this.hourMorning;
      this.minTotal = this.minTotal+ this.minMorning;
    }
      
    if(element.Evening.Start != '' && element.Evening.End !='') {
      //EveningTime
    if(element.Evening.End.slice(0, 1) === '0'){
      this.hourEvening1 = element.Evening.End.slice(1, 2)
    } else{
      this.hourEvening1 = element.Evening.End.slice(0, 2)
    }

    if(element.Evening.Start.slice(0, 1) === '0'){
      this.hourEvening2 = element.Evening.Start.slice(1, 2)
    } else{
      this.hourEvening2 = element.Evening.Start.slice(0, 2)
    }

    if(element.Evening.End.slice(3, -1) === '0'){
      this.minEvening1 = element.Evening.End.slice(4)
    } else{
      this.minEvening1 = element.Evening.End.slice(3)
    }

    if(element.Evening.Start.slice(3, -1) === '0'){
      this.minEvening2 = element.Evening.Start.slice(4)
    } else{
      this.minEvening2 = element.Evening.Start.slice(3)
    }
    console.log("orele: "+ this.hourEvening1+' '+this.minEvening1+' '+this.hourEvening2+ ' '+this.minEvening2);

    this.hourEvening = Number(this.hourEvening1) - Number(this.hourEvening2);
    this.minEvening = Number(this.minEvening1) - Number(this.minEvening2);
    console.log("minEveningute: ", this.minEvening);
    
    if(this.minEvening < 0){
      this.minEvening = 60 + this.minEvening;
      this.hourEvening--;
    }

    console.log("hourEvening: ",this.hourEvening," minEvening: ", this.minEvening);
        
    this.hoursTotal = this.hoursTotal + this.hourEvening;
    this.minTotal = this.minTotal + this.minEvening;    
    
  }
    
  
      
    });

    if(this.minTotal >= 60){
      this.minTotal = this.minTotal-60;
      this.hoursTotal++;
    }
    console.log("total: " + this.hoursTotal+' : '+ this.minTotal);
    

    return this.hoursTotal;
   }
}
