import { None, Some } from './Optional'

describe('Result', () => {
    let some = Some(10);
    let none = None();

    it('then should return new contained value if value is not none', () => {
        some
            .then(el => el**2)
            .then(el => expect(el).toBe(100));


        expect(
            some
                .then(() => 10)
                .else(() => 20)
                .unwrap()
        ).toBe(10);
    });
    
    it('else should return new contained value if value is none', () => {
        expect(
            none
                .then(() => 10)
                .else(() => 20)
                .unwrap()
        ).toBe(20);

        expect(
            none
                .then(() => 10)
                .else(() => 2)
                .then(el => el**2)
                .unwrap()
        ).toBe(4);
    });
});