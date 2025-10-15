// /api/submit.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const webhookURL = "https://discord.com/api/webhooks/1182915455183233044/revXXoJdQMLH3CxnKfIpn_LkYeFM4sshMyxruRO8W9qbzB9vrHd9FA796zlT-bARJWES"; // Secure webhook from environment
    if (!webhookURL) {
      return res.status(500).json({ message: "Webhook URL not configured." });
    }

    const data = req.body;

    const discordResponse = await fetch(webhookURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (!discordResponse.ok) {
      return res.status(discordResponse.status).json({ message: "Failed to send to Discord." });
    }

    res.status(200).json({ message: "Application sent successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}
