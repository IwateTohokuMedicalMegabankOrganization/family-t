const calc = require('../../../js/modules/calc');


test('test sum.', ()=> {
  expect(calc.sum(1, 2)).toBe(3);
});
test('test bar.', () => {
    const bar = require('../../../js/modules/calc.js').__get__('_private');
    expect(bar(1, 2)).toBe(2);
});
  
test('特定の関数についてmockを使用して特定の値を返却する', ()=> {
  // モックを設定する
  console.log('spyOnの前', calc.sum, calc.minus);
  jest.spyOn(calc, 'sum').mockReturnValue(5);
  console.log('spyOnの後', calc.sum, calc.minus);

  // モックを呼び出す
  expect(calc.sum(1,2)).toBe(5);

  // モックを元の関数に戻す
  calc.sum.mockRestore();
  console.log('mockRestoreの後', calc.sum, calc.minus);
  expect(calc.sum(1,2)).not.toBe(5);
});
test('特定の関数についてmockを使用して特定の関数を実行する', ()=> {
  jest.spyOn(calc, 'sum').mockImplementation((a,b) => {
    console.log('mock function');
    return 100;
  });
  expect(calc.sum(1,2)).toBe(100);
  jest.restoreAllMocks();
  expect(calc.sum(1,2)).toBe(3);
});