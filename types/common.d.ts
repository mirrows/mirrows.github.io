export type NormalObj<T> = {
  [key: string]: T
}

export type Prettify<T> = T extends object ? { [K in keyof T]: Prettify<T[K]> } : T
