import executor from "./executor";

import { Result } from '../result';

describe('executor', () => {
    it('should unwrap all values', () => {
        executor(function* main() {
            const result = new Result(() => 10);
        
            expect(yield result.map((el) => el * 2)).toBe(20);
            expect(yield Promise.resolve(10)).toBe(10);
            expect(yield Promise.resolve(30)).toBe(30);
        });
    });

    it('should save execution order', () => {
        const res: any = [];
        const sleep = (value: any, ms: number) => new Promise(res => setTimeout(() => res(value), ms));

        executor(function* main() {
            const result = new Result(() => 10);
        
            res.push(yield sleep(10, 100))
            res.push(yield result.map((el) => el * 2))
            res.push(yield Promise.resolve(30))
            res.push(yield Promise.resolve(40))
        })
        sleep(res, 1000).then(res => {
            expect(res).toEqual([10, 20, 30, 40])
        })
    });
})