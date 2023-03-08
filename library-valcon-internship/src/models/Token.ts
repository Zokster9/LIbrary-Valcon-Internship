export default interface Token {
    accessToken: string;
    refreshToken: string;
    expiration: Date;
    role: string;
}
