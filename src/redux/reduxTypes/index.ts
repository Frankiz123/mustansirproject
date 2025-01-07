export interface AuthState {
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
}

export interface ReadEmailState {
  read_auth_url: string | null;
  readEmailLoading: boolean;
  isAuthorize: boolean;
  isAuthorizeLoading: boolean;
  readInboxLoading: boolean;
  readInbox: boolean;
}
