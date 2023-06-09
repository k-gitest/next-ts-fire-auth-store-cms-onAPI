export type Post = {
  pid?: string,
  uid?: string,
  id?: string,
  title: string,
  release: string,
  category: string,
  article: string,
  createdAt?: number | undefined,
}

type Timestamp = {
  nanoseconds: number;
  seconds: number;
};