export type Chat = {
  role: 'user'|'model',
  parts: { text: string }[],
}