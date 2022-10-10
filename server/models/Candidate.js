const { Schema, model } = require('mongoose');

const candidateSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zipcode: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  linkedIn: {
    type: String
  },
  gitHub: {
    type: String
  },
  projects: [
    { 
      name: String,
      description: String,
      technologies: [String],
      sourceLink: String,
      deployedLink: String
    }
  ],
  experience: [
    {
      company: String,
      title: String,
      location: String,
      startDate: Date,
      endDate: Date,
      responsibilities: [String]
    }
  ],
  education: [
    {
      school: String,
      degree: String,
      graduation_date: Date
    }
  ],
  skills: [String],
  interests: [String]
});

const Candidate = model('Candidate', candidateSchema);

module.exports = Candidate;
