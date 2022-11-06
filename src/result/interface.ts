export interface Container<T> {}

export interface Monada<T> {
    map<R>(fn: (data: T) => R): Container<R>;
}

export interface Functor<T> {
    map<R>(fn: (data: T) => Container<R>): Container<R>;
}