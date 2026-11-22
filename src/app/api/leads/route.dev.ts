/**
 * DEV-ONLY stub for POST /api/leads.
 *
 * The `.dev.ts` extension is picked up only by `next dev` (see next.config.ts),
 * because a static export cannot contain POST route handlers. In production
 * point NEXT_PUBLIC_LEADS_ENDPOINT at your real backend / serverless function.
 */
export async function POST(request: Request) {
  const lead = await request.json().catch(() => null);
  if (!lead || typeof lead !== "object") {
    return Response.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }
  const phone = String((lead as Record<string, unknown>).phone ?? "").replace(/[\s()-]/g, "");
  if (!/^\+380\d{9}$/.test(phone)) {
    return Response.json({ ok: false, error: "invalid_phone" }, { status: 422 });
  }
  console.log("[api/leads] new lead:", lead);
  return Response.json({ ok: true });
}
