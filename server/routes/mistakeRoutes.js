import express from 'express';
const router = express.Router();
import Mistake from '../Models/mistakes.js';



router.post('/save-mistakes', async (req, res) => {
    try {
        const { mistakes, userId } = req.body;
  
        // Log the incoming request to inspect the body
        console.log("Request Body:", req.body);
  
        // Validate the request body
        if (!mistakes || mistakes.length === 0) {
            return res.status(400).json({ error: 'No mistakes to save.' });
        }
  
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required.' });
        }
  
        // Ensure mistakes is an array
        if (!Array.isArray(mistakes)) {
            return res.status(400).json({ error: 'Mistakes should be an array.' });
        }
  
        // Find or create the user's mistake document
        let userMistakes = await Mistake.findOne({ user: userId });
  
        if (!userMistakes) {
            // If the user doesn't have any mistakes, create a new document
            userMistakes = new Mistake({
                user: userId,
                mistakes: [],
            });
        }
  
        // Existing mistakes based on correctAnswer for quick lookup
        const existingMistakesSet = new Set(
            userMistakes.mistakes.map((mistake) => mistake.correctAnswer)
        );
  
        // Filter out mistakes that already exist based on correctAnswer
        const uniqueMistakes = mistakes.filter(
            (mistake) => !existingMistakesSet.has(mistake.correctAnswer)
        );
  
        // Add only unique mistakes
        if (uniqueMistakes.length > 0) {
            userMistakes.mistakes.push(
                ...uniqueMistakes.map((mistake) => ({
                    ...mistake,
                    timestamp: new Date(), // Add current timestamp to new mistakes
                }))
            );
  
            // Save the updated document
            await userMistakes.save();
        }
  
        // Respond with a success message
        return res.status(200).json({
            message: 'Mistakes saved successfully.',
            savedMistakes: uniqueMistakes, // Only the unique mistakes will be saved
        });
    } catch (error) {
        console.error('Error saving mistakes:', error);
        return res.status(500).json({ error: 'An error occurred while saving mistakes.' });
    }
});


router.get('/get-mistakes', async (req, res) => {
    const { userId } = req.query;
    //console.log(userId);
    
    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    try {
        const mistakes = await Mistake.find({ user: userId }); // Use 'user' instead of 'userId' based on your schema
        
        if (!mistakes || mistakes.length === 0) {
            return res.status(404).json({ error: 'No mistakes found for this user' });
        }

        res.json({ mistakes });
    } catch (err) {
        console.error('Error fetching mistakes:', err); // Log error for debugging
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
