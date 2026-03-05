import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'development_secret_do_not_use_in_production_12345';
const encodedSecret = new TextEncoder().encode(JWT_SECRET);

export async function signToken(payload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(encodedSecret);
}

export async function verifyToken(token) {
    try {
        const { payload } = await jwtVerify(token, encodedSecret);
        return payload;
    } catch (error) {
        return null;
    }
}
