# Реализация контейнера Optional

Контейнер реализуется родительским классом Optional и двумя функциями-конструкторами: None и Some

### Конструктор

Some<T>(T)

None()

### Методы:

- then<R>(cb: (data: T) => Data<R>): Optional<R> - выполняет коллбэк на контейнере и возвращает новый

- else<R>(cb: (err: T) => Data<R>): Optional<T | R> - выполняется, если None

- unwrap(): T - распаковывает значение из контейнера

## Пример использования

```js
const none = None()
const none = Some(10)

none.then(console.log).catch(() => console.log('none')) // 'none'

some.then(console.log).catch(() => console.log('none')) // 10
```