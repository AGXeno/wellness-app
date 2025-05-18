const express = require('express');
const router = express.Router();
const Mood = require('../models/Mood');

// @route   GET /api/moods
// @desc    Get all moods for a user
// @access  Private
router.get('/', async (req, res) => {
  try {
    // For now, we'll use a placeholder userId
    // Later, we'll implement proper authentication
    const userId = req.query.userId || 'testuser123';
    
    const moods = await Mood.find({ userId }).sort({ date: -1 });
    res.json(moods);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/moods
// @desc    Create a new mood entry
// @access  Private
router.post('/', async (req, res) => {
  try {
    const { score, note, tags } = req.body;
    // For now, we'll use a placeholder userId
    const userId = req.body.userId || 'testuser123';
    
    const newMood = new Mood({
      score,
      note,
      tags,
      userId
    });
    
    const mood = await newMood.save();
    res.json(mood);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/moods/:id
// @desc    Get mood by ID
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const mood = await Mood.findById(req.params.id);
    
    if (!mood) {
      return res.status(404).json({ msg: 'Mood not found' });
    }
    
    // Check if the mood belongs to the user
    // For now, we'll use a placeholder userId
    const userId = req.query.userId || 'testuser123';
    if (mood.userId !== userId) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    
    res.json(mood);
  } catch (err) {
    console.error(err.message);
    
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Mood not found' });
    }
    
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/moods/:id
// @desc    Delete a mood
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const mood = await Mood.findById(req.params.id);
    
    if (!mood) {
      return res.status(404).json({ msg: 'Mood not found' });
    }
    
    // Check if the mood belongs to the user
    // For now, we'll use a placeholder userId
    const userId = req.query.userId || 'testuser123';
    if (mood.userId !== userId) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    
    await mood.deleteOne();
    
    res.json({ msg: 'Mood removed' });
  } catch (err) {
    console.error(err.message);
    
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Mood not found' });
    }
    
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/moods/:id
// @desc    Update a mood
// @access  Private
router.put('/:id', async (req, res) => {
  try {
    const { score, note, tags } = req.body;
    
    const mood = await Mood.findById(req.params.id);
    
    if (!mood) {
      return res.status(404).json({ msg: 'Mood not found' });
    }
    
    // Check if the mood belongs to the user
    // For now, we'll use a placeholder userId
    const userId = req.body.userId || 'testuser123';
    if (mood.userId !== userId) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    
    // Update fields
    if (score !== undefined) mood.score = score;
    if (note !== undefined) mood.note = note;
    if (tags !== undefined) mood.tags = tags;
    
    await mood.save();
    
    res.json(mood);
  } catch (err) {
    console.error(err.message);
    
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Mood not found' });
    }
    
    res.status(500).send('Server Error');
  }
});

module.exports = router;

