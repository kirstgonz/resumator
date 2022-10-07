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
  location: {
    type: String,
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
      roles: [String],
      sourceLink: String,
      deployedLink: String
    }
  ],
  experience: [
    {
      company: String,
      title: String,
      location: String,
      start_date: Date,
      end_date: Date,
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
  awards: [
    {
      issuer: String,
      award: String
    }
  ],
  skills: [String],
  languages: [String],
  interests: [String]
});

const Candidate = model('Candidate', candidateSchema);

module.exports = Candidate;
