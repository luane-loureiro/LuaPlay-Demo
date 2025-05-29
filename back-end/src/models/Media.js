const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  url: { type: String, required: true },
  coverUrl: { type: String },
  duration: { type: Number },
  playlist: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Playlist', 
    required: true 
  },
  favorite: {
    type: Boolean,
    default: false,
  }
});

module.exports = mongoose.model('Media', MediaSchema);
