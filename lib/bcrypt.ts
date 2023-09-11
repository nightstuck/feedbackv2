import bcrypt from "bcrypt";
import crypto from "crypto";

export async function hashPassword(unhashedPassword: string) {
	return bcrypt.hash(unhashedPassword, 10).then((hash: string) => {
		return hash;
	});
}

export async function isSamePassword(unhashedPassword: string, hashedPassword: string) {
	return bcrypt.compare(unhashedPassword, hashedPassword).then((result: boolean) => {
		return result;
	});
}

export async function generateAccessKey(length: number) {
	return crypto.randomBytes(length).toString("hex");
}
