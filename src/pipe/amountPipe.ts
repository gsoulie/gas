import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'amountPipe'  // pipe name
})
/**
 * Formattage de la date en JJ/MM/AAAA
 */
export class amountPipe implements PipeTransform{
    // Pipe function
    transform(value, fixed) {
        if(value){
            fixed = fixed || 3;
            return value.toFixed(fixed);
        }
    }
}