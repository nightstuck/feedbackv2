import type { NextApiRequest, NextApiResponse } from "next";
import { hashPassword } from "@/lib/bcrypt";
import { Prisma, PrismaClient } from "@prisma/client";

type Data = {
	signup: boolean;
	error?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	if (req.method != "POST") return res.status(405).send({ signup: false, error: "method" });

	const db = new PrismaClient();

	let { username, email, password } = req.body;

	//check if user already exists
	const whereEmailIsUnique = Prisma.validator<Prisma.userWhereUniqueInput>()({
		email: email,
	});
	const whereUsernameIsUnique = Prisma.validator<Prisma.userWhereUniqueInput>()({
		username: username,
	});
	if (
		(await db.user.findUnique({
			where: whereUsernameIsUnique,
		})) != null
	) {
		return res.status(404).send({ signup: false, error: "username" });
	}
	if (
		(await db.user.findUnique({
			where: whereEmailIsUnique,
		})) != null
	) {
		return res.status(404).send({ signup: false, error: "email" });
	}

	await db.user.create({
		data: {
			email: email,
			username: username,
			pw_hash: await hashPassword(password),
		},
	});

	//TODO send Confirmation E-Mail

	res.status(200).send({ signup: true });

	db.$disconnect();
}
