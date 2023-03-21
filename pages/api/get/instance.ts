import type { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "@/lib/iron";
import { getInstancesOfUserId } from "@/lib/prisma";
import { instance, Prisma, PrismaClient } from "@prisma/client";

type Data = {
	ok: boolean;
	instance?: {
		id: number;
		secure: boolean;
		anonymous: boolean;
	};
	error?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	if (req.method != "GET") return res.status(405).send({ ok: false, error: "method" });

	const db = new PrismaClient();

	const whereInstanceId = Prisma.validator<Prisma.instanceWhereUniqueInput>()({
		id: Number(req.query.id),
	});

	const instance = await db.instance.findUnique({ where: whereInstanceId });

	if (!instance) res.status(404).send({ ok: false, error: "not found" });
	else
		res
			.status(200)
			.send({
				ok: true,
				instance: { id: instance.id, secure: Boolean(instance.secure), anonymous: Boolean(instance.anonymous) },
			});
}
