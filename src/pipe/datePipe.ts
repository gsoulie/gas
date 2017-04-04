import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'datePipe'  // pipe name
})
/**
 * Formattage de la date en JJ/MM/AAAA
 */
export class datePipe implements PipeTransform{
    // Pipe function
    transform(value) {
        if(value.length == 10){
            return value.substring(8,10) + "/" + value.substring(5,7) + "/" + value.substring(0,4);
        } else {
            return value;
        }
    }
}