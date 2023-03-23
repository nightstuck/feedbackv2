import type { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "@/lib/iron";
import { getFeedbacksByInstanceId } from "@/lib/prisma";
import { feedback } from "@prisma/client";

type Data = {
	ok: boolean;
	feedbacks?: feedback[];
	error?: string;
};

export default withSessionRoute(handler);

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	if (req.method != "GET") return res.status(405).send({ ok: false, error: "method" });

	let { id } = req.query;

	if (id == undefined) return res.status(404).send({ ok: false, error: "data" });

	const feedbacks = await getFeedbacksByInstanceId(Number(id));

	res.status(200).send({ ok: true, feedbacks: feedbacks });
}
