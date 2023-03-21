import type { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "@/lib/iron";
import { createInstance, getInstancesOfUserId } from "@/lib/prisma";
import { instance } from "@prisma/client";
import { hashPassword } from "@/lib/bcrypt";

type Data = {
	ok: boolean;
	instance?: instance | null;
	error?: string;
};

export default withSessionRoute(handler);

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	if (req.method != "POST") return res.status(405).send({ ok: false, error: "method" });

	let { name, anonymous, secure, identifier } = req.body;

	if (!name && !anonymous && !secure && !identifier)
		return res.status(404).send({ ok: false, error: "wrong data provided." });

	const ident = secure ? await hashPassword(identifier) : "";

	const instance = await createInstance(name, req.session.user.user_id, anonymous, secure, ident);

	if (instance == null) return res.status(404).send({ ok: false, error: "name" });

	res.status(200).send({ ok: true, instance: instance });
}
