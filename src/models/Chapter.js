const mongoose = require('mongoose');

const yearWiseQuestionCountSchema = new mongoose.Schema({
  "2019": { type: Number, default: 0 },
  "2020": { type: Number, default: 0 },
  "2021": { type: Number, default: 0 },
  "2022": { type: Number, default: 0 },
  "2023": { type: Number, default: 0 },
  "2024": { type: Number, default: 0 },
  "2025": { type: Number, default: 0 }
});

const chapterSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
    enum: ['Physics', 'Chemistry', 'Mathematics']
  },
  chapter: {
    type: String,
    required: true,
    trim: true
  },
  class: {
    type: String,
    required: true,
    enum: ['Class 11', 'Class 12']
  },
  unit: {
    type: String,
    required: true,
    trim: true
  },
  yearWiseQuestionCount: {
    type: yearWiseQuestionCountSchema,
    required: true
  },
  questionSolved: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  },
  status: {
    type: String,
    required: true,
    enum: ['Not Started', 'In Progress', 'Completed'],
    default: 'Not Started'
  },
  isWeakChapter: {
    type: Boolean,
    required: true,
    default: false
  }
}, {
  timestamps: true
});


const Chapter = mongoose.model('Chapter', chapterSchema);

module.exports = Chapter;