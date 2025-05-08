import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Missing API key" }, { status: 500 });
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "你是一位寫作助理。" },
        { role: "user", content: prompt },
      ],
    }),
  });

  const text = await response.text();
  console.log("🧠 GPT API 回應：", text);

  try {
    const data = JSON.parse(text);
    const result = data.choices?.[0]?.message?.content || "(無內容回傳)";
    return NextResponse.json({ result });
  } catch (err) {
    console.error("GPT JSON parse error:", err); // ✅ 用掉 err
    return NextResponse.json({ error: "JSON 解析失敗" }, { status: 500 });
  }
}
