import express from 'express';
import mongoose from 'mongoose'; // Import mongoose
import Level from '../Models/Question.js';

const router = express.Router();



router.post('/level/:level/modules/:module/questions', async (req, res) => {
  const { question, options, answer, hint } = req.body;

  try {
    const { levelId, moduleId } = req.params;

    // Check if levelId and moduleId are valid ObjectIds
    if (!mongoose.Types.ObjectId.isValid(levelId) || !mongoose.Types.ObjectId.isValid(moduleId)) {
      return res.status(400).json({ message: 'Invalid levelId or moduleId' });
    }

    // Convert levelId and moduleId to ObjectId using 'new' keyword
    const levelObjectId = new mongoose.Types.ObjectId(levelId);
    const moduleObjectId = new mongoose.Types.ObjectId(moduleId);

    // Find the level by ObjectId
    const level = await Level.findById(levelObjectId);
    if (!level) return res.status(404).json({ message: 'Level not found' });

    // Find the module within the level by ObjectId
    const module = level.modules.id(moduleObjectId);
    if (!module) return res.status(404).json({ message: 'Module not found' });

    // Add the new question to the module
    module.questions.push({ question, options, answer, hint });

    // Save the updated level with the new question
    await level.save();

    // Respond with the updated module
    res.status(201).json(module);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.get('/:level/modules/:moduleId', async (req, res) => {
  const { level, moduleId } = req.params;
  //console.log(`Processing request for module ${moduleId} at level ${level}`);

  try {
    // Fetch the level data
    const levelData = await Level.findOne({
      level: parseInt(level), // Ensure level matches the correct type
    });

    if (!levelData) {
      console.log('Level not found');
      return res.status(404).json({ message: 'Level not found' });
    }

    //console.log('Fetched level data:', JSON.stringify(levelData, null, 2));

    // Find the module based on moduleNumber
    const module = levelData.modules.find(
      (mod) => mod.moduleNumber === parseInt(moduleId)
    );

    if (!module) {
      console.log('Module not found in level data');
      console.log('Modules:', levelData.modules);
      return res.status(404).json({ message: 'Module not found' });
    }

    // Return questions for the found module
    console.log('Returning questions for the module');
    return res.json({ questions: module.questions });
  } catch (err) {
    console.error('Error fetching module:', err.message);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
});




export default router;
