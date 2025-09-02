const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        index: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        select: false,
        required: true
    },
    profile: {
        bio: String,
        website: String,
        socialLinks: {
            type: [String],
            validate: {
                validator: val => val.length > 0
            }
        }
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    }]
}, { timestamps: true });

userSchema.virtual("followersCount").get(function () {
    return this.followers.length;
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

const Users = mongoose.model("Users", userSchema);

const postSchema = mongoose.Schema({
    title: {
        type: String,
        maxLength: 150,
        required: true,
    },
    content: {
        type: String,
        required: true,
        minLength: 150
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    tags: {
        type: [String],
        validate: {
            validator: val => val.length > 0,
            message: "Atleast one tag is required!"
        }
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    }],
    comments: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users"
        },
        text: String,
        createdAt: {
            type: Date,
            default: Date.now,
            immutable: true
        }
    }],
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

postSchema.index({ title: 1, tags: 1 })

const Posts = mongoose.model("Posts", postSchema);

module.exports = {
    Posts,
    Users
}