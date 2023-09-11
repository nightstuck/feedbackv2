import type { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "@/lib/iron";
import { getAccessKeyById, getFeedbacksByInstanceId } from "@/lib/prisma";
import { feedback } from "@prisma/client";

type Data = {
	ok: boolean;
	feedbacks?: feedback[];
	error?: string;
};

export default withSessionRoute(handler);

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	if (req.method != "GET") return res.status(405).send({ ok: false, error: "method" });

	let { id, key } = req.query;

	if (id == undefined || key == undefined) return res.status(404).send({ ok: false, error: "data" });

	const access_key = await getAccessKeyById(Number(id));

	if (key && access_key != key) return res.status(401).send({ ok: false, error: "key" });

	const feedbacks = await getFeedbacksByInstanceId(Number(id));

	res.status(200).send({ ok: true, feedbacks: feedbacks });
}
