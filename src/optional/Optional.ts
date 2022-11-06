type Data<T> = T | Optional<T>;

class Optional<T> {

    readonly isEmpty: boolean;

    protected readonly data?: T;

    constructor(fn: () => Data<T>) {
        try {
            const data = fn()

            if (data instanceof Optional) {
                this.isEmpty = data.isEmpty;
                this.data = data.unwrap();
                return ;
            }

            this.isEmpty = false;
            this.data = data;

        } catch {
            this.isEmpty = true;
        }
    }

    then<R>(cb: (data: T) => Data<R>): Optional<R> {
        return new Optional(() => {
            if (this.isEmpty) throw 'empty';

            return cb(this.data!)
        })
    }

    else<R>(cb: (err: T) => Data<R>): Optional<T | R> {
        return new Optional(() => {
            if (this.isEmpty) {
                return cb(this.data!);
            }

            return this.data!
        })
    }

    unwrap(): T {
        if (this.isEmpty) {
            throw new Error("data is empty");
        }

        return this.data!;
    }

}

export function None(): Optional<never> {
    return new Optional(() => {
        throw 'empty';
    })
}

export function Some<T>(data: Data<T>): Optional<T> {
    return new Optional(() => data);
}
