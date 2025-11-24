let token: string | undefined;

export function setToken(value: string) {
  token = value?.trim();
}

export function getToken(): string | undefined {
  return token;
}

export function clearToken() {
  token = undefined;
}
