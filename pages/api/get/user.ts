import type { NextApiRequest, NextApiResponse } from "next";
import { Prisma, PrismaClient } from "@prisma/client";
import { withSessionRoute } from "@/lib/iron";

type Data = {
	ok: boolean;
	user?: {
		username: string;
		email: string;
	} | null;
	error?: string;
};

export default withSessionRoute(handler);

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	if (req.method != "GET") return res.status(405).send({ ok: false, error: "method" });

	const db = new PrismaClient();

	if (req.session.user == undefined) return res.status(401).send({ ok: false, error: "login" });

	res.status(200).send({ ok: true, user: req.session.user });

	db.$disconnect();
}
