import crypto from 'crypto'

export function createSecureRandom(bytes: number = 16) {
    return crypto.randomBytes(bytes).toString('hex');
}

export function createHash(password: string, salt: string) {
    return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
}
