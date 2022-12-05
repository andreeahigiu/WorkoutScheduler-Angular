import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WorkoutScheduler-Angular';
  activeTab:string = 'Monday';
  daysArray=['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Resume']
  currentIndex:any;
  backDisabled=true;
  nextDisabled=false;

  onTabClick(selectedTab:string){
    this.activeTab = selectedTab;
    console.log(this.activeTab);

  }

  onChosenActivity(event: any){
    console.log(event);
    
  }

  nextTab() {
    this.currentIndex = this.daysArray.indexOf(this.activeTab);
    this.currentIndex++;
    this.activeTab = structuredClone(this.daysArray[this.currentIndex]);

    this.backDisabled=false;
    if(this.activeTab==='Resume'){
      this.nextDisabled=true;
    } else {
      this.nextDisabled=false;
    }

  }

  previousTab(){
    this.currentIndex = this.daysArray.indexOf(this.activeTab);
    this.currentIndex--;
    this.activeTab = this.daysArray[this.currentIndex];

    this.nextDisabled=false;
    if(this.activeTab==='Monday'){
      this.backDisabled=true;
    }else {
      this.backDisabled=false;
    }

  }

  
}
