export interface loginApiArg {
  email: string;
  password: string;
}

export interface loginApiResonse {
  statusCode: 201;
  message: string;
  data: {
    accessToken: string;
  };
  timestamp: string;
}
