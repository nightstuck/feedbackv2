import type { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "@/lib/iron";
import { getInstancesOfUserId } from "@/lib/prisma";

type Data = {
	ok: boolean;
	instances?:
		| {
				name: string;
				anonymous: boolean;
				secure: boolean;
				id: number;
		  }[]
		| null;
	error?: string;
};

export default withSessionRoute(handler);

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	if (req.method != "GET") return res.status(405).send({ ok: false, error: "method" });

	const instances = await getInstancesOfUserId(req.session.user.user_id);

	res.status(200).send({ ok: true, instances: instances });
}
