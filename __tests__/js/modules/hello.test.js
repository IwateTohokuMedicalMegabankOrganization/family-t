import hello from '../../../js/modules/hello';

test('Hello jest!', () => {
  expect(hello()).toBe('Hello module!');
});