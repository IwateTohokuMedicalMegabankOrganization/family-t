import { sum, minus } from '../../../js/modules/calc';

test('test sum.', ()=> {
  expect(sum(1, 2)).toBe(3);
});
test('test bar.', () => {
    const bar = require('../../../js/modules/calc.js').__get__('_private');
    expect(bar(1, 2)).toBe(2);
});

test('test minus.', () => {
  expect(minus(3, 2)).toBe(1);
});