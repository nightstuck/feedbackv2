import type { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "@/lib/iron";
import { createInstance, getInstancesOfUserId } from "@/lib/prisma";
import { instance } from "@prisma/client";

type Data = {
	ok: boolean;
	instance?: instance | null;
	error?: string;
};

export default withSessionRoute(handler);

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	if (req.method != "POST") return res.status(405).send({ ok: false, error: "method" });

	let { name, anonymous, secure, identifier } = req.body;

	res.status(200).send({ ok: true });
}
