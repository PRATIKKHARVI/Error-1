import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "https://thumbs.dreamstime.com/b/student-icon-vector-male-person-profile-graduation-avatar-mortar-board-student-icon-vector-graduation-mortar-board-108392243.jpg"
    },
},{timestamps:true});

const User=mongoose.model('User',userSchema);

export default User;