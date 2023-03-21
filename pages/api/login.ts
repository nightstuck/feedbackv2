import type { NextApiRequest, NextApiResponse } from "next";
import { isSamePassword } from "@/lib/bcrypt";
import { Prisma, PrismaClient } from "@prisma/client";
import { withSessionRoute } from "@/lib/iron";

type Data = {
	login: boolean;
	error?: string;
};

export default withSessionRoute(loginRoute);

async function loginRoute(req: NextApiRequest, res: NextApiResponse<Data>) {
	if (req.method != "POST") return res.status(405).send({ login: false, error: "method" });

	const db = new PrismaClient();

	let { username, password } = req.body;

	const whereEmailIsUnique = Prisma.validator<Prisma.userWhereUniqueInput>()({
		email: username,
	});

	const whereUsernameIsUnique = Prisma.validator<Prisma.userWhereUniqueInput>()({
		username: username,
	});

	let user;

	user = await db.user.findUnique({
		where: whereUsernameIsUnique,
	});

	if (user == null) {
		user = await db.user.findUnique({
			where: whereEmailIsUnique,
		});
	}

	if (user == null) return res.status(404).send({ login: false, error: "user" });

	const samePassword = await isSamePassword(password, user?.pw_hash);
	if (samePassword == false) res.status(401).send({ login: false, error: "password" });

	req.session.user = {
		user_id: user.id,
		username: user.username,
		email: user.email,
	};
	await req.session.save();

	res.status(200).send({ login: true });

	db.$disconnect();
}
