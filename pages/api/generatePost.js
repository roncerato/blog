import { GoogleGenerativeAI } from "@google/generative-ai"

export default async function handler(req, res) {

    const genAI = new GoogleGenerativeAI(process.env.GEMINIAI_API_KEY || "AIzaSyALte96IvUrifbqd8lmJX9w9yKVV6GW14o");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const topic = "Top 10 tips for dog owners"
    const keywords = "first-time dog owners, common dog health issues, best dog breeds"
    const prompt = `Write a long and detailed SEO-friendly blog post about ${topic}, that targets the following comma-separated keywords: ${keywords}. 
    The content should be formatted in SEO-friendly HTML.
    The response must also include appropriate HTML title and meta description content.
    The return format must be stringified JSON in the following format:
    {
        "postContent": post content here
        "title": title goes here
        "metaDescription": meta description goes here
    }
    `;

    const result = await model.generateContent(prompt);
    // console.log(result.response.text());

    res.status(200).json(result.response.text())
}