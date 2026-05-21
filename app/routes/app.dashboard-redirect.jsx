import jwt from "jsonwebtoken";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);

  const token = jwt.sign(
    { shop: session.shop },
    process.env.JWT_SECRET,
    { expiresIn: "5m" }
  );

  const dashboardUrl = process.env.DASHBOARD_URL || "http://localhost:5173";
  const redirectUrl = `${dashboardUrl}/auth?token=${token}`;

  return Response.json({ redirectUrl });
};
