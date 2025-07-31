const express = require('express');
const axios = require('axios');
const router = express.Router();

// Send raw quiz questions as JSON
router.get('/api', async (req, res) => {
  try {
    const response = await axios.get('https://opentdb.com/api.php?amount=10&category=18&type=multiple');
    const apiQuestions = response.data.results;

    const formattedQuestions = apiQuestions.map(q => {
      const options = [...q.incorrect_answers, q.correct_answer].sort(() => 0.5 - Math.random());
      const optionMap = {};
      ['A', 'B', 'C', 'D'].forEach((letter, i) => optionMap[letter] = options[i]);

      const answerKey = Object.entries(optionMap).find(([_, val]) => val === q.correct_answer)?.[0];

      return {
        question: q.question,
        ...optionMap,
        answer: answerKey
      };
    });

    res.json(formattedQuestions);
  } catch (error) {
    console.error('Error fetching quiz questions:', error);
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
});

router.get('/quiz', (req, res) => {
  res.render('quiz'); // No need to pass username here
});

module.exports = router;
