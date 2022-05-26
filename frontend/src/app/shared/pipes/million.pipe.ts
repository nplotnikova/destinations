import { formatNumber } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'million',
})
export class MillionPipe implements PipeTransform {
    transform(value: number, decimals: number = 2): string {
        if (!value) {
            return '';
        }
        return formatNumber(value / Math.pow(10, 6), 'en', `1.${decimals}-${decimals}`);
    }
}
