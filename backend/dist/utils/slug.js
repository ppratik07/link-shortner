"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomSlug = void 0;
// backend/src/utils/slug.ts
function generateRandomSlug(length = 6) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}
exports.generateRandomSlug = generateRandomSlug;
