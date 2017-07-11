export interface Token {
    access_token: AccessToken;
    token_type: string;
}
export interface AccessToken {
    __v: string;
    value: string;
    clientId: string;
    userId: string;
    _id: string;
}