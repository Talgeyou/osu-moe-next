import { fetchGuestToken } from "helpers/api";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getGuestTokenHandler(req: NextApiRequest, res: NextApiResponse) {
    const guestToken = await fetchGuestToken();
    res.setHeader("Set-Cookie", `guest_token=${guestToken?.accessToken}`);
    res.json(guestToken);
}
