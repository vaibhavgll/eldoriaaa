export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    mcUsername,
    timezone,
    playerType,
    playTime,
    serverActivities,
    buildProject
  } = req.body;

  const webhookUrl = "https://discord.com/api/webhooks/1182915455183233044/revXXoJdQMLH3CxnKfIpn_LkYeFM4sshMyxruRO8W9qbzB9vrHd9FA796zlT-bARJWES";

  if (!webhookUrl) {
    return res.status(500).json({ error: 'Webhook URL not set' });
  }

  const payload = {
    embeds: [
      {
        title: "New Whitelist Application",
        color: 5814783,
        timestamp: new Date().toISOString(),
        footer: { text: `Submitted by ${mcUsername}` },
        fields: [
          { name: "Minecraft Username", value: mcUsername, inline: true },
          { name: "Time Zone (GMT)", value: timezone, inline: true },
          { name: "Player Type", value: playerType || 'Not specified', inline: false },
          { name: "How long have they been playing?", value: playTime, inline: false },
          { name: "What do they like to do on servers?", value: serverActivities, inline: false },
          { name: "Describe a decent build project:", value: buildProject, inline: false },
        ]
      }
    ]
  };

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error(`Discord responded with ${response.status}`);
    return res.status(200).json({ message: 'Application sent successfully!' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to send webhook' });
  }
}
