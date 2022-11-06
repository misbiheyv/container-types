import { Result } from "../result/Result.js";

export default function executor(fn: () => Generator) {
    const exec = (gen: Generator, value?: any) => {
        let cur = gen.next(value);
    
        if (cur.done) {
            return Promise.resolve(cur.value);
        }
    
        return Promise.resolve(cur.value)
            .then(res => {
                if (cur.done) {
                    return cur.value;
                }
    
                exec(gen, res)
            })
            .catch(err => {
                if (cur.done) {
                    return cur.value;
                }
    
                exec(gen, err);
            })
    };

    return exec(fn());
}