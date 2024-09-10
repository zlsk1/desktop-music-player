export const isNil = (val: unknown): val is undefined | null => val == null
export const isString = (val: unknown): val is string => typeof val === 'string'

export type MakeTuple<
  T extends number,
  C extends any[] = []
> = C['length'] extends T ? C : MakeTuple<T, [...C, any]>;

/**
 * @description 两数相加
 */
export type Add<T1 extends number, T2 extends number> = [...MakeTuple<T1>, ...MakeTuple<T2>]['length'];

/**
 * @description 生成长数字枚举类型
 */
export type Enumerate<T extends number, U extends number[] = []> = U['length'] extends T
  ? U[number]
  : Enumerate<T, [...U, U['length']]>

/**
 * @description 对整数的大小做约束
 */
export type IntRange<
  T extends number,
  U extends number
> = Exclude<Enumerate<Add<U, 1> & number>, Enumerate<T>>
