const mongoose = require("mongoose");
const seedDB = require("./seed");
const { Users, Posts } = require("./scheema");

mongoose.connect("mongodb://localhost:27017/media-social")

async function main() {
    try {
        // await mongoose.connection.dropDatabase();
        // await seedDB();

        const one = await Posts.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "author",
                    foreignField: "_id",
                    as: "author"
                },
            },
            {
                $unwind: "$author"
            },
            {
                $addFields: {
                    interactions: {
                        $add: [
                            { $size: "$likes" },
                            { $size: "$author.followers" }
                        ]
                    }
                }
            },
            {
                $group: {
                    _id: "$author.username",
                    totalInteractions: {
                        $sum: "$interactions"
                    },
                    authorName: { $first: "$author.username" }
                }
            },
            {
                $sort: {
                    totalInteractions: -1
                }
            },
            {
                $limit: 5
            },
            {
                $project: {
                    _id: 0
                }
            }
        ]);
        // console.log(one);


        const two = await Posts.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(Date.now() - (30 * 24 * 60 * 60 * 1000))
                    }
                }
            },
            {
                $addFields: {
                    totalComments: {
                        $size: "$comments"
                    }
                }
            },
            {
                $sort: {
                    totalComments: -1
                }
            },
            {
                $limit: 10
            },
            { $lookup: { from: "users", localField: "author", foreignField: "_id", as: "author" } },
            { $unwind: "$author" },
            { $project: { title: 1, totalComments: 1, createdAt: 1, "author.username": 1, "author.email": 1 } }

        ]);
        console.log(two);


        const username = "user12";
        const three = await Users.aggregate([
            { $match: { username } },
            { $lookup: { from: "users", localField: "followers", foreignField: "_id", as: "followers" } },
            { $unwind: "$followers" },
            { $lookup: { from: "users", localField: "followers.followers", foreignField: "_id", as: "secondDegree" } },
            { $unwind: "$secondDegree" },
            { $group: { _id: "$secondDegree._id", username: { $first: "$secondDegree.username" } } }
        ]);
        // console.log(three);

        const four = await Posts.aggregate([
            {
                $unwind: "$tags"
            },
            {
                $group: {
                    _id: "$tags",
                    count: {
                        $sum: 1
                    },
                }
            },
            {
                $sort: {
                    count: -1
                }
            },
            {
                $limit: 5
            }
        ]);
        // console.log(four);

        const followed = await Users.findOne({ username: user }).select("following");
        const five = await Posts.aggregate([
            {
                $match: {
                    $and: [
                        { isDeleted: false },
                        { author: { $nin: followed.following } }
                    ]
                }
            },
            { $lookup: { from: "users", localField: "author", foreignField: "_id", as: "author" } },
            { $unwind: "$author" },
            { $project: { title: 1, "author.username": 1, tags: 1 } }
        ]);
        // console.log(five)
    } catch (e) {
        console.log(e?.message);
    }
}

main();
