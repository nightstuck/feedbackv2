import { Prisma, PrismaClient } from "@prisma/client";

export async function getUserId(username?: string, email?: string) {
	if (!username && !email) return null;

	const db = new PrismaClient();

	const whereEmailIsUnique = Prisma.validator<Prisma.userWhereUniqueInput>()({
		email: username,
	});

	const whereUsernameIsUnique = Prisma.validator<Prisma.userWhereUniqueInput>()({
		username: username,
	});

	if (username) {
		let user = await db.user.findUnique({ where: whereUsernameIsUnique });
		if (user != null) return user.id;
	}
	if (email) {
		let user = await db.user.findUnique({ where: whereEmailIsUnique });
		if (user != null) return user.id;
	}

	db.$disconnect();
}

export async function getInstancesOfUserId(user_id: number) {
	const db = new PrismaClient();

	const whereUser_id = Prisma.validator<Prisma.instanceWhereInput>()({
		user_id: user_id,
	});

	const instances = await db.instance.findMany({ where: whereUser_id });

	const inst = instances?.map((i) => {
		return { name: i.name, anonymous: Boolean(i.anonymous), secure: Boolean(i.secure), id: i.id };
	});

	db.$disconnect();

	return instances.length == 0 ? null : inst;
}

export async function createInstance(
	name: string,
	user_id: any,
	anonymous: boolean,
	secure: boolean,
	identifier: string
) {
	const db = new PrismaClient();

	const whereNameIsEqual = Prisma.validator<Prisma.instanceWhereInput>()({
		name: name,
		user_id: user_id,
	});

	const sameName = await db.instance.findFirst({ where: whereNameIsEqual });

	if (sameName != null) {
		db.$disconnect();
		return null;
	}

	const instance = await db.instance.create({
		data: {
			user_id: user_id,
			anonymous: Number(anonymous),
			name: name,
			secure: Number(secure),
			identifier: identifier,
		},
	});

	db.$disconnect();

	return instance;
}

export async function getFeedbacksByInstanceId(instance_id: number) {
	const db = new PrismaClient();

	const whereUserId = Prisma.validator<Prisma.feedbackWhereInput>()({
		instance_id: instance_id,
	});

	const feedbacks = await db.feedback.findMany({ where: whereUserId });

	db.$disconnect();

	return feedbacks;
}
