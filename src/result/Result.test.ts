import { Result } from './Result';

describe('Result', () => {
    let result: Result<number> = new Result<number>(() => 10);

    it('map should return a new boxed value', () => {
        result
            .map((el) => el * 2)
            .map((el) => expect(el).toBe(20));
    });

    it('flatten should unbox the value from the wrapper, do something and return', () => {
        result
            .flatten((el) => new Result(() => el * 10))
            .map((el) => expect(el).toBe(100));
    });

    it('should catch the error and return a handled content', () => {
        result
            .map((el) => el * 2)
            .flatten((el) => Result.error(el))
            .catch((err) => expect(() => { throw err; }).toThrowError('20'));
    });

    it('catch should return data and chain with other functions', () => {
        result
            .map((el) => Result.error(el))
            .flatten((el) => Result.error(el))
            .catch(() => '100')
            .map((val) => expect(val).toBe('100'));
    });
});