import mongoose from 'mongoose';

const { Schema, ObjectId, model } = mongoose;

export default model('Leaderboard', new Schema([{
    patientId: ObjectId, nickname: String, streak: Number, engagementRate: Number,
}]), 'leaderboard');
