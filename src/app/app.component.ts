import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'cockpit-github.io';
  message = '';
  printMessageTimeouts: any[] = [];
  CurrentStatus: Status.Codes;

  constructor() {
    this.CurrentStatus = Status.Codes.Welcome;
    setTimeout(() => {
      this.printMessage('Welcome to Cockpit');
    }, 1650);
  }

  Start() {
    this.clearMessageTimeouts();
    this.CurrentStatus = Status.Codes.Main;
    this.printMessage('Klik');
  }

  printMessage(str: string) {
    var that = this;
    let tab: Array<string> = str.split('');
    let sec_between: Number = 65;
    var sec: Number = 0;
    var result: string = '';
    var i: Number = 0;
    //typing
    tab.forEach(char => {
      sec = Number(sec) + Number(sec_between);
      this.printMessageTimeouts.push(setTimeout(function(){
        result += char;
        that.message = result.concat('_');
      }, Number(sec)));
    });
    //end typing
    var sec_end: Number = Number(sec_between)*tab.length;
    let nums: Array<Number> = [1,2,3,4,5,6,7];
    nums.forEach(num => {
      let delay: Number = (Number(sec_end) + (Number(sec_between) * Number(num) * Number(10)));
      this.printMessageTimeouts.push(setTimeout(function(){
        //cursor blinking
        if (Number(num)%2==0) {
          that.message = result.concat('_');
        } else {
          that.message = result.concat('  ');
        }
      }, Number(delay)));
    });
  }

  clearMessageTimeouts(){
    for (var i = 0; i < this.printMessageTimeouts.length; i++) {
        clearTimeout(this.printMessageTimeouts[i]);
    }
  }
}

export namespace Status
{
    export enum Codes
    {
      Welcome = 'Welcome',
      Main = 'Main'
    }
}
