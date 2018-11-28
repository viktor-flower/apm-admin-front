export interface ISession {
  token: string;
}

export function createSession({
  token = ''
}: Partial<ISession>) {
  return {
    token
  };
}
