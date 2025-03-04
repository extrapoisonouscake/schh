export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };
export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
// ... existing code ...

export type DeepWithRequired<
  T,
  K extends T extends Array<infer U> ? keyof U : keyof T
> = T extends Array<infer U>
  ? Array<WithRequired<U, K & keyof U>>
  : WithRequired<T, K>;
export const zodEnum = <T>(arr: T[]): [T, ...T[]] => arr as [T, ...T[]];
export type PickByKeys<T, K extends (keyof T)[]> = {
  [P in K[number]]: T[P];
};
export type NonUndefined<T> = Exclude<T, undefined>;
