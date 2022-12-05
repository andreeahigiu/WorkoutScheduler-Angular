import { Component, OnInit } from '@angular/core';
import { ActivitiesService } from '../activities.service';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit {
  activitiesOptions = ['Alergare usoara', 'Tenis', 'Inot', 'Fotbal', 'Handbal', 'Volei'];
  number=0;
  hoursTotal=0;
  minsTotal=0;

  daysArray = [{
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
  }, ];

  sorter = {
    // "sunday": 0, // << if sunday is first day of week
    'monday': 1,
    'tuesday': 2,
    'wednesday': 3,
    'thursday': 4,
    'friday': 5,
    'saturday': 6,
    'sunday': 7
  };


  constructor(private activitiesService: ActivitiesService) { }

  
  ngOnInit(): void {
    this.daysArray=structuredClone(this.activitiesService.activities.slice(1));

    this.daysArray.sort((a, b) => {
      let day1 = a.Day.toLowerCase();
      let day2 = b.Day.toLowerCase();
      return this.sorter[day1 as keyof typeof this.sorter] - this.sorter[day2 as keyof typeof this.sorter];
    });

    this.daysArray.forEach(e => {
      e.Morning.Activity = this.activitiesOptions[e.Morning.Activity as unknown as number];
      e.Evening.Activity = this.activitiesOptions[e.Evening.Activity as unknown as number];

    })
    this.activitiesService.gethourMorningsTotal();
    this.hoursTotal=this.activitiesService.hoursTotal;
    this.minsTotal=this.activitiesService.minTotal;
  }

}
