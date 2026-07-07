// Updated goal to 4000 pounds!
let currentSavings = 0.00;
const savingsGoal = 4000.00; 
const secretApiKey = "MySuperSecretKey123"; 

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
            return res.status(401).json({ error: "Unauthorized." });
        }

        if (typeof amount !== 'number') {
            return res.status(400).json({ error: "Invalid amount." });
        }

        currentSavings += amount;
        return res.status(200).json({ message: "Updated!", newTotal: currentSavings });
    }

    return res.status(405).json({ error: "Method not allowed" });
}