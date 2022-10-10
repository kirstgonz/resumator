const db = require('../config/connection');
const { User, Candidate } = require('../models');
const userSeeds = require('./userSeeds.json');
const candidateData = require('./candidateData.json');
const projectData =  require('./projectData.json');
const experienceData =  require('./experienceData.json');
const educationData =  require('./educationData.json');


db.once('open', async () => {
  try {
    await Thought.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);