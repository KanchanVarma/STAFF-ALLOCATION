import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name:'regMatch'})
export class RegMatch implements PipeTransform {
    transform(value: string, arg?: any): any {
        if(!value || value=="")
        return value
        console.log("CALLLL")
        let regex = new RegExp(/^([A-Za-z_]+.{15}\b)/g);
        var c = value.match(regex);
        console.log("CALLLL    =",c)
        if(c)
        return value.match(regex);
        else return value

    }
}