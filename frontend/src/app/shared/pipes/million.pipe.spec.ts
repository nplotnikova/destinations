import { MillionPipe } from './million.pipe';

describe('MillionPipe', () => {

    const pipe = new MillionPipe();

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    describe('ordinary value', () => {
        it('should be properly transformed', () => {
            expect(pipe.transform(1234567)).toEqual('1.23');
        });
    });

    describe('ordinary value with number if decimals', () => {
        it('should be properly transformed', () => {
            expect(pipe.transform(1234567, 1)).toEqual('1.2');
            expect(pipe.transform(1234567, 3)).toEqual('1.235');
        });
    });

    describe('zero value', () => {
        it('should be transformed into empty string', () => {
            expect(pipe.transform(0)).toEqual('');
        });
    });

    describe('small value', () => {
        it('should be transformed into `< 1`', () => {
            expect(pipe.transform(42)).toEqual('< 1');
        });
    });

    describe('negative value', () => {
        it('should be not supported', () => {
            expect(() => pipe.transform(-42)).toThrow(new Error('Negative numbers not supported'));
        });
    });
});
