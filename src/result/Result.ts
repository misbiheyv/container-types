import { 

    Functor,
    Monada

} from './interface'

type ErrorData = Error | Failure;
type SuccessData<T> = T |  Success<T>;
type Data<T> = SuccessData<T> | ErrorData;

export class Result<T> 
    implements Monada<T>, Functor<T> {

    protected data!: T | Error;

    protected isSuccess: boolean = true;


    public get status() : string {
        return this.isSuccess ? 'Success' : 'Failure';
    }


    constructor(fn: () => Data<T>) {
        try {
            const data = fn();

            if (data instanceof Failure) throw data.unwrap();

            if (data instanceof Error) throw data;

            if (data instanceof Success) {
                this.data = data.unwrap()
            } else {
                this.data = data;
            }

            this.isSuccess = true;
            
        } catch(err: any) {
            this.isSuccess = false;

            if (err instanceof Error) {
                this.data = err
            } else {
                this.data = new Error(err);
            }
        }
    }

    static error(reason: Error | string | { toString(): string }): Failure {
        if (typeof reason === 'string') {
            return new Failure(new Error(reason));
        }
        if (typeof reason.toString === 'function') {
            return new Failure(new Error(reason.toString()));
        }

        return new Failure(<Error>reason);
    }

    static success<K>(data: K): Success<K> {
        return new Success(data);
    }


    unwrap(): T | Error {
        if (this.isSuccess) {
            return this.data;
        }

        if (typeof this.data === 'string') {
            throw new Error(this.data);
        }

        throw this.data;
    }

    map<R>(cb: (v: T) => Data<R>): Result<R> {
        try {
            if (this.data instanceof Failure) {
                throw this.data.unwrap();
            }
            if (this.data instanceof Error) {
                throw this.data;
            }

            return new Success<R>(<SuccessData<R>>cb(this.data));
        } catch (err: any) {
            return new Failure(err);
        }
    }

    flatten<R>(cb: (v: T) => Result<R>): Result<R> {
        try {
            if (this.data instanceof Error) {
                throw this.data;
            }

            return cb(this.data);
        } catch (err: any) {
            return new Failure(err);
        }
    }

    catch<R>(cb: (err: T | Error) => Data<R>): Result<R> {
        try {
            return new Result<R>(() => cb(this.data))
        } catch (err: any) {
            return new Failure(err);
        }
    }

    then<R>(cb: (err: T | Error) => Data<R>): Result<R> {
        try {
            return new Result<R>(() => cb(this.data))
        } catch (err: any) {
            return new Failure(err);
        }
    }

}

export class Success<T> extends Result<T> {

    constructor(data: SuccessData<T>) {
        super(() => data);
    }

}

export class Failure extends Result<any> {

    constructor(data: ErrorData) {
        super(() => data);
        this.isSuccess = false;
    }

}