import { describe, it } from "mocha";
import { expect } from "chai";
import { ObjectPool } from '../src/index'

describe("objectPool", () => {
    it("create 100 ins", () => {
        let pool = new ObjectPool({
            create: () => new Float32Array(4),
            reset: (item: Float32Array) => {
                for (let i = 0; i < item.length; i++) {
                    item[i] = 0;
                }
            },
            initSize: 100,
        });
        expect(pool.size).to.equal(100);
    });

    it("creat ins by pool", () => {
        let pool = new ObjectPool({
            create: () => new Float32Array(4),
            reset: (item: Float32Array) => {
                for (let i = 0; i < item.length; i++) {
                    item[i] = 0;
                }
            },
            initSize: 100,
        });

        let ins = pool.create();
        expect(pool.size).to.equal(99);
        expect(ins instanceof Float32Array).to.equal(true);
    });

    it("reset ins by pool", () => {
        let pool = new ObjectPool({
            create: () => new Float32Array(4),
            reset: (item: Float32Array) => {
                for (let i = 0; i < item.length; i++) {
                    item[i] = 1;
                }
            },
            initSize: 100,
        });

        let ins = pool.create();
        expect(ins[0]).to.equal(1);
    });
});
