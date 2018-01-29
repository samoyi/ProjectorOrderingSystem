'use strict';

const assert = require('assert');
const {coordinatesOnRing, radiansOnRing} = require('../src/js/MyUtil');

describe('MyUtil', ()=>{
    describe('coordinatesOnRing', ()=>{
        it('5, 4', ()=>{
            const expected = [[5, 0 ], [0, -5 ], [-5, 0 ], [0, 5]];
            assert.deepStrictEqual(coordinatesOnRing(5, 4), expected);
        });
        it('5, 4, Math.PI/2', ()=>{
            const expected = [[0, -5 ], [-5, 0 ], [0, 5], [5, 0]];
            assert.deepStrictEqual(coordinatesOnRing(5, 4, Math.PI/2)
                                                                , expected);
        });
        it('5, 4, Math.PI', ()=>{
            const expected = [[-5, 0 ], [0, 5], [5, 0 ], [0, -5]];
            assert.deepStrictEqual(coordinatesOnRing(5, 4, Math.PI)
                                                                , expected);
        });
        it('5, 4, Math.PI*1.5', ()=>{
            const expected = [[0, 5], [5, 0 ], [0, -5 ], [-5, 0]];
            assert.deepStrictEqual(coordinatesOnRing(5, 4, Math.PI*1.5)
                                                                , expected);
        });
        it('5, 4, Math.PI*2', ()=>{
            const expected = [[5, 0 ], [0, -5 ], [-5, 0 ], [0, 5]];
            assert.deepStrictEqual(coordinatesOnRing(5, 4, Math.PI*2)
                                                                , expected);
        });
        it('(5, 4, -Math.PI/2)', ()=>{
            const expected = [[0, 5], [5, 0 ], [0, -5 ], [-5, 0]];
            assert.deepStrictEqual(coordinatesOnRing(5, 4, -Math.PI/2)
                                                                , expected);
        });
        it('5, 4, -Math.PI', ()=>{
            const expected = [[-5, 0 ], [0, 5], [5, 0 ], [0, -5]];
            assert.deepStrictEqual(coordinatesOnRing(5, 4, -Math.PI)
                                                                , expected);
        });
        it('5, 4, -Math.PI*1.5', ()=>{
            const expected = [[0, -5 ], [-5, 0 ], [0, 5], [5, 0]];
            assert.deepStrictEqual(coordinatesOnRing(5, 4, -Math.PI*1.5)
                                                                , expected);
        });
        it('5, 4, -Math.PI*2', ()=>{
            const expected = [[5, 0 ], [0, -5 ], [-5, 0 ], [0, 5]];
            assert.deepStrictEqual(coordinatesOnRing(5, 4, -Math.PI*2)
                                                                , expected);
        });
        it('0, 4', ()=>{
            const expected = [[0, 0 ], [0, -0 ], [-0, 0 ], [0, 0]];
            assert.deepStrictEqual(coordinatesOnRing(0, 4), expected);
        });
        it('-1, 4', ()=>{
            const expected = [];
            assert.deepStrictEqual(coordinatesOnRing(-1, 4), expected);
        });
        it('5, 2', ()=>{
            const expected = [[5, 0 ], [-5, 0 ]];
            assert.deepStrictEqual(coordinatesOnRing(5, 2), expected);
        });
        it('5, 1', ()=>{
            const expected = [[5, 0 ]];
            assert.deepStrictEqual(coordinatesOnRing(5, 1), expected);
        });
        it('5, 0', ()=>{
            const expected = [];
            assert.deepStrictEqual(coordinatesOnRing(5, 0), expected);
        });
        it('5, -1', ()=>{
            const expected = [];
            assert.deepStrictEqual(coordinatesOnRing(5, -1), expected);
        });
        it('5, 3.14', ()=>{
            const expected = [];
            assert.deepStrictEqual(coordinatesOnRing(5, 3.14), expected);
        });
    });

    describe('radiansOnRing', ()=>{
        it('4', ()=>{
            const expected = [0, Math.PI/2, Math.PI, Math.PI*1.5];
            assert.deepStrictEqual(radiansOnRing(4), expected);
        });
        it('4, Math.PI/2', ()=>{
            const expected = [Math.PI/2, Math.PI, Math.PI*1.5, 0];
            assert.deepStrictEqual(radiansOnRing(4, Math.PI/2), expected);
        });
        it('4, Math.PI', ()=>{
            const expected = [Math.PI, Math.PI*1.5, 0, Math.PI/2];
            assert.deepStrictEqual(radiansOnRing(4, Math.PI), expected);
        });
        it('4, Math.PI*1.5', ()=>{
            const expected = [Math.PI*1.5, 0, Math.PI/2, Math.PI];
            assert.deepStrictEqual(radiansOnRing(4, Math.PI*1.5), expected);
        });
        it('4, Math.PI*2', ()=>{
            const expected = [0, Math.PI/2, Math.PI, Math.PI*1.5];
            assert.deepStrictEqual(radiansOnRing(4, Math.PI*2), expected);
        });
        it('4, -Math.PI/2', ()=>{
            const expected = [Math.PI*1.5, 0, Math.PI/2, Math.PI];
            assert.deepStrictEqual(radiansOnRing(4, -Math.PI/2), expected);
        });
        it('4, -Math.PI', ()=>{
            const expected = [Math.PI, Math.PI*1.5, 0, Math.PI/2];
            assert.deepStrictEqual(radiansOnRing(4, -Math.PI), expected);
        });
        it('4, -Math.PI*1.5', ()=>{
            const expected = [Math.PI/2, Math.PI, Math.PI*1.5, 0];
            assert.deepStrictEqual(radiansOnRing(4, -Math.PI*1.5), expected);
        });
        it('4, -Math.PI*2', ()=>{
            const expected = [0, Math.PI/2, Math.PI, Math.PI*1.5];
            assert.deepStrictEqual(radiansOnRing(4, -Math.PI*2), expected);
        });
        it('0', ()=>{
            const expected = [];
            assert.deepStrictEqual(radiansOnRing(0), expected);
        });
        it('-1', ()=>{
            const expected = [];
            assert.deepStrictEqual(radiansOnRing(-1), expected);
        });
        it('3.14', ()=>{
            const expected = [];
            assert.deepStrictEqual(radiansOnRing(3.14), expected);
        });
    });
});
