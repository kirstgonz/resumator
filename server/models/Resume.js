const { Schema, model } = require('mongoose');

const resumeSchema = new Schema({
  title: String,
  intro: String,
  candidate: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Candidate',
    },
  ],
});

const Resume = model('Resume', resumeSchema);

module.exports = Resume;
