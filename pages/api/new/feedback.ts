import type { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "@/lib/iron";
import { instance, Prisma, PrismaClient } from "@prisma/client";
import { hashPassword, isSamePassword } from "@/lib/bcrypt";

type Data = {
	ok: boolean;
	error?: string;
};

export default withSessionRoute(handler);

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	if (req.method != "POST") return res.status(405).send({ ok: false, error: "method" });

	let { instance, feedback } = req.body;

	const db = new PrismaClient();

	const whereInstanceId = Prisma.validator<Prisma.instanceWhereUniqueInput>()({
		id: instance.id,
	});
	const inst = await db.instance.findUnique({ where: whereInstanceId });
	if (inst == null) return res.status(404).send({ ok: false, error: "id" });

	if (Boolean(inst.secure) == true) {
		if (!(await isSamePassword(feedback.password, inst?.identifier)))
			return res.status(401).send({ ok: false, error: "password" });
	}

	let author = Boolean(inst.anonymous) ? "" : feedback.author;
	console.log(Boolean(inst.anonymous));

	await db.feedback.create({
		data: {
			instance_id: instance.id,
			text: feedback.text,
			author: author,
		},
	});

	res.status(200).send({ ok: true });

	db.$disconnect();
}
