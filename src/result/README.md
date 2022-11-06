# Реализация контейнера Result

Контейнер реализуется родительским классом Result и двумя классами: Failure и Success

### Конструктор

Result<T>(() => T) - принимает функцию

Success<T>(T) - данные которые хотим упаковать в контейнер

Failure(reason: Error | string | { toString() }) - принимает объект на основе которого будет создана ошибка 

### Геттеры:

- status - Возвращает значение "Success"/"Failure"

### Статические методы:

- error(reason: Error | string | { toString(): string }): Failure - возвращает контейнер Failure с переданным значением

- success<K>(data: K): Success<K> - возвращает контейнер Success с переданным значением

### Методы:

-  map<R>(cb: (v: T) => Data<R>): Result<R> - Реализует интерфейс функтора. Применяет функцию к контейнеру и возвращает контейнер с результатом.

- map<R>(cb: (v: T) => Result<R>): Result<R> - Реализует интерфейс монады. Применяет функцию к контейнеру и возвращает контейнер с результатом.

- catch<R>(cb: (err: T | Error) => Data<R>): Result<R> - обрабатывает ошибку и возвращает новый контейнер

- catch<R>(cb: (v: T | Error) => Data<R>): Result<R> - Добавлен для удобства и симметричности API. Делает то же самое, что catch

- unwrap() - распаковывает значение из контейнера

## Пример использования

```js
const result = new Result(() => 10);

result
    .map((el) => el * 2)
    .flatten((el) => Result.error(el))
    .catch((err) => expect(() => { throw err; })); // Error: 20
```