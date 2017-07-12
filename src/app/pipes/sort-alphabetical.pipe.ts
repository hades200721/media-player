import { Pipe, PipeTransform } from '@angular/core';
import { Song } from '../shared/song.model';

@Pipe({
    name: 'sortAlphabetical'
})

export class SortAlphabeticalPipe implements PipeTransform {

    transform(value: Song[], sortBy: string = 'name', descending: boolean = true): any {
        const coefficient = (descending) ? 1 : -1;
        return value.sort((a, b) => {
            if (b[sortBy] < a[sortBy]) {
                return coefficient * -1;
            }
            return coefficient;
        })
    }
}