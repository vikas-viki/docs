const { Users, Posts } = require("./scheema");

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const pickRandom = (arr, count) => {
    const copy = [...arr];
    const picked = [];
    while (picked.length < count && copy.length > 0) {
        const idx = Math.floor(Math.random() * copy.length);
        picked.push(copy.splice(idx, 1)[0]);
    }
    return picked;
};

const hobbiesList = ["reading", "gaming", "traveling", "music", "sports", "cooking", "drawing"];
const tagsList = ["mongodb", "graphql", "nodejs", "backend", "javascript", "express", "api"];

async function seedDB() {
    const users = [];
    for (let i = 1; i <= 50; i++) {
        users.push(new Users({
            username: `user${i}`,
            email: `user${i}@example.com`,
            password: "password123",
            profile: {
                bio: `Bio for user${i}`,
                website: `https://user${i}.dev`,
                socialLinks: [`https://twitter.com/user${i}`]
            },
            hobbies: pickRandom(hobbiesList, randomInt(1, 3))
        }));
    }

    const savedUsers = await Users.insertMany(users);
    console.log("Inserted 50 users");

    const userIds = savedUsers.map(u => u._id);


    for (const user of savedUsers) {
        const followers = pickRandom(userIds.filter(id => !id.equals(user._id)), randomInt(0, 10));
        const following = pickRandom(userIds.filter(id => !id.equals(user._id)), randomInt(0, 10));
        user.followers = followers;
        user.following = following;
        await user.save();
    }
    console.log("Assigned followers and following");

    const posts = [];
    for (let i = 1; i <= 30; i++) {
        const author = pickRandom(userIds, 1)[0];
        const likes = pickRandom(userIds.filter(id => !id.equals(author)), randomInt(0, 5));
        const comments = pickRandom(userIds.filter(id => !id.equals(author)), randomInt(0, 5)).map(uid => ({
            user: uid,
            text: `Comment by user ${uid.toString().slice(-4)}`
        }));

        posts.push({
            title: `Post Title ${i}`,
            content: `This is a sample content for post number ${i}. It is deliberately long so that it exceeds 150 characters. Lorem ipsum dolor sit amet, consectetur adipiscing elit. ${i}`,
            author,
            tags: pickRandom(tagsList, randomInt(1, 3)),
            likes,
            comments,
            isDeleted: false
        });
    }

    await Posts.insertMany(posts);
    console.log("Inserted 30 posts");
}

module.exports = seedDB;
