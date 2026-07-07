let currentSavings = 0.00;
const savingsGoal = 4000.00;
const secretApiKey = "MySuperSecretKey123"; // You'll use this key to add/remove money later

export default function handler(req, res) {
    if (req.method === 'GET') {
        const percentage = (currentSavings / savingsGoal) * 100;
        return res.status(200).json({
            current: currentSavings,
            goal: savingsGoal,
            progressPercentage: percentage
        });
    }

    if (req.method === 'POST') {
        const clientApiKey = req.headers['x-api-key'];
        const { amount } = req.body;

        if (clientApiKey !== secretApiKey) {
            return res.status(401).json({ error: "Unauthorized. Invalid API Key." });
        }

        if (typeof amount !== 'number') {
            return res.status(400).json({ error: "Please provide a valid number amount." });
        }

        currentSavings += amount;
        return res.status(200).json({ message: "Updated!", newTotal: currentSavings });
    }

    return res.status(405).json({ error: "Method not allowed" });
}