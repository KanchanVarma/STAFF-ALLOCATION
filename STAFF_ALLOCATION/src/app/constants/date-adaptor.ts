import { NativeDateAdapter } from '@angular/material';
import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';


export const PICK_FORMATS = {
    parse: {
        dateInput: {month: 'short', year: 'numeric', day: 'numeric'}
	},
    display: {
        dateInput: 'input',
        //monthYearLabel: {year: 'numeric', month: 'short'},
	    monthYearLabel: {month: 'long'},
        dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
        monthYearA11yLabel: {year: 'numeric', month: 'long'}
    }
};

@Injectable()
export class PickDateAdapter extends NativeDateAdapter {
    format(date: Date, displayFormat: Object): string {
        if (displayFormat === 'input') {
            console.log("PURANA ",date)
            if(date.getHours()!=12){
                date.setHours(12)
                date.setMinutes(0)
                date.setSeconds(0)
                console.log("CHANGE 1")
            }
            // var _utc = new Date(date.setMinutes(  (date.getTimezoneOffset()* -1)));
  
            console.log("Date 1",date,"UTC",date)
            return new DatePipe('en-GB').transform(date, 'dd/MM/yyyy');
        } else {
            if(date.getHours()!=12){
                date.setHours(12)
                date.setMinutes(0)
                date.setSeconds(0)
                
                console.log("CHANGE 2")
            }
            // var _utc = new Date(date.setMinutes(  (date.getTimezoneOffset()* -1)));
            console.log("Date 2",date,"UTC",date)
            return  date.toDateString();
        }
        
    }
}