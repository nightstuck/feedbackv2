export async function api<TResponse>(url: string, config: RequestInit = {}): Promise<TResponse> {
	return fetch("/api/" + url, config)
		.then((response) => response.json())
		.then((data) => data as TResponse);
}

type Ok = {
	ok: boolean;
};

export async function isLoggedIn() {
	const data = await fetch("/api/get/user")
		.then((r) => r.json())
		.then((data) => data as Ok);
	return data.ok;
}
