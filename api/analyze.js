export default async function handler(req, res) {
  try {
    const { name, image } = req.body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are expert palm reader. Give deep analysis in Hindi."
          },
          {
            role: "user",
            content: [
              { type: "text", text: `Client Name: ${name}` },
              {
                type: "image_url",
                image_url: {
                  url: image
                }
              },
              {
                type: "text",
                text: `
Analyze this palm and give:

1. Past
2. Present
3. Future
4. Personality
5. Money & Career
6. Relationship
7. Remedies

Language: Hindi
`
              }
            ]
          }
        ]
      })
    });

    const data = await response.json();

    res.status(200).json({
      result: data.choices[0].message.content
    });

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}
