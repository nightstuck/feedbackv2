import type { NextApiRequest, NextApiResponse } from "next";
import { instance, Prisma, PrismaClient } from "@prisma/client";
import { isSamePassword } from "@/lib/bcrypt";

type Data = {
	ok: boolean;
	error?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	if (req.method != "POST") return res.status(405).send({ ok: false, error: "method" });

	let { password, instance_id } = req.body;

	if (!password || !instance_id) return res.status(404).send({ ok: false, error: "data" });

	const db = new PrismaClient();

	const whereInstanceId = Prisma.validator<Prisma.instanceWhereUniqueInput>()({
		id: instance_id,
	});

	const inst = await db.instance.findUnique({ where: whereInstanceId });

	if (inst && !(await isSamePassword(password, inst?.identifier)))
		return res.status(401).send({ ok: false, error: "password" });

	res.status(200).send({ ok: true });
}
