import { formatNumber } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'million',
})
export class MillionPipe implements PipeTransform {
    transform(value: number, decimals: number = 2): string {
        if (value < 0) {
            throw Error('Negative numbers not supported');
        }
        if (!value) {
            return '';
        }
        if (value < 10 ** 6) {
            return '< 1';
        }
        return formatNumber(value / 10 ** 6, 'en', `1.${decimals}-${decimals}`);
    }
}
