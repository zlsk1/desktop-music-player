export const isNil = (val: unknown): val is undefined | null => val == null
export const isString = (val: unknown): val is string => typeof val === 'string'
