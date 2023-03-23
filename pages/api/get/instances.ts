import type { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "@/lib/iron";
import { getInstancesOfUserId } from "@/lib/prisma";

type Data = {
	ok: boolean;
	instances?: any;
	error?: string;
};

export default withSessionRoute(handler);

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	if (req.method != "GET") return res.status(405).send({ ok: false, error: "method" });

	const instances = await getInstancesOfUserId(req.session.user.user_id);

	const inst = instances?.map((i) => {
		return { name: i.name, anonymous: i.anonymous, secure: i.secure, id: i.id };
	});

	res.status(200).send({ ok: true, instances: inst });
}
