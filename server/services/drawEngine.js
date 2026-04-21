const Score = require('../models/Score');

function generateRandomNumbers() {
  const numbers = new Set();
  while (numbers.size < 5) {
    numbers.add(Math.floor(Math.random() * 45) + 1);
  }
  return Array.from(numbers).sort((a, b) => a - b);
}

async function generateAlgorithmicNumbers() {
  const allScores = await Score.find({}, 'score');
  if (allScores.length === 0) return generateRandomNumbers();

  const frequency = {};
  allScores.forEach((s) => {
    frequency[s.score] = (frequency[s.score] || 0) + 1;
  });

  const maxFreq = Math.max(...Object.values(frequency));
  const weighted = [];
  for (let i = 1; i <= 45; i++) {
    const freq = frequency[i] || 0;
    const weight = maxFreq - freq + 1;
    for (let w = 0; w < weight; w++) {
      weighted.push(i);
    }
  }

  const numbers = new Set();
  while (numbers.size < 5) {
    const idx = Math.floor(Math.random() * weighted.length);
    numbers.add(weighted[idx]);
  }
  return Array.from(numbers).sort((a, b) => a - b);
}

function findMatches(userScores, winningNumbers) {
  const winSet = new Set(winningNumbers);
  const matched = userScores.filter((s) => winSet.has(s));
  return matched;
}

function getMatchType(matchCount) {
  if (matchCount === 5) return '5-match';
  if (matchCount === 4) return '4-match';
  if (matchCount === 3) return '3-match';
  return null;
}

module.exports = { generateRandomNumbers, generateAlgorithmicNumbers, findMatches, getMatchType };
