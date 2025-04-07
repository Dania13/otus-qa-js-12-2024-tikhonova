import { fullTrim, getTotal, nameIsValid } from '../src/app';

describe('nameIsValid function', () => {
  it('imports without errors', () => {
    expect(nameIsValid).toBeDefined();
    expect(typeof nameIsValid).toBe('function');
  });

  const casesForName = [
    ['dasha', true],
    ['Dasha', false],
    ['da', true],
    ['d', false],
    ['даша', false],
  ];

  test.each(casesForName)(
    'works for %s for length and latin',
    (name: any, expectedResult: any) => {
      expect(nameIsValid(name)).toBe(expectedResult);
    },
  );

  it('validate of type of name', () => {
    expect(nameIsValid(['dasha'])).toBeFalsy();
  });
});

describe('fullTrim function', () => {
  it('imports without errors', () => {
    expect(fullTrim).toBeDefined();
    expect(typeof fullTrim).toBe('function');
  });


  it('works for spaces inside', () => {
    expect(fullTrim('te   st')).toBe('test');
  });

  it('works for spaces outside', () => {
    expect(fullTrim('   test     ')).toBe('test');
  });

  it('works with empty string', () => {
    // @ts-expect-error
    expect(fullTrim()).toBe('');
  });
});

describe('getTotal function', () => {
  it('imports without errors', () => {
    expect(getTotal).toBeDefined();
    expect(typeof getTotal).toBe('function');
  });

  it('returns error if discount is not number', () => {
    expect(() => {
      // @ts-expect-error
      getTotal([{ price: 10, quantity: 10 }], '50%');
    }).toThrow('Скидка должна быть числом');
  });

  it('returns error if discount less 0', () => {
    expect(() => {
      // @ts-expect-error
      getTotal([{ price: 10, quantity: 10 }], -50);
    }).toThrow('Процент скидки должен быть от 0 до 99');
  });

  it('returns error if discount more 100', () => {
    expect(() => {
      // @ts-expect-error
      getTotal([{ price: 10, quantity: 10 }], 100);
    }).toThrow('Процент скидки должен быть от 0 до 99');
  });

  it('counts without discount is correct', () => {
      // @ts-expect-error
    expect(getTotal([{ price: 10, quantity: 10 }])).toBe(100);
  });

  // баг :-)
  // it('counts with discount is correct', () => {
  //   expect(getTotal([{ price: 10, quantity: 10 }], 99)).toBe(1);
  // });

  it('counts with two items is correct', () => {
    expect(
      getTotal([
        // @ts-expect-error
        { price: 10, name: 'кофеварка', quantity: 10 },
        // @ts-expect-error
        { price: 2, quantity: 3, name: 'мышеловка' },
      ]),
    ).toBe(106);
  });

  it('works without items', () => {
    expect(getTotal([], 0)).toBe(0);
  });
});
