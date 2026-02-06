const foodModel = require("../models/food.model");
const likeModel = require("../models/likes.model");
const saveModel = require("../models/save.model");

/**
 * CREATE FOOD (Food Partner only)
 */
async function createFood(req, res) {
    try {
        const { name, description, price } = req.body;

        const videoFile = req.files?.video?.[0];
        const imageFile = req.files?.image?.[0];

        if (!name || !price) {
            return res.status(400).json({ message: "Name and price required" });
        }

        if (!videoFile && !imageFile) {
            return res.status(400).json({ message: "Video or Image required" });
        }

        // Convert image to base64
        const imageData = imageFile
            ? {
                data: imageFile.buffer.toString("base64"),
                contentType: imageFile.mimetype
            }
            : null;

        // Convert video to base64 (optional)
        const videoData = videoFile
            ? {
                data: videoFile.buffer.toString("base64"),
                contentType: videoFile.mimetype
            }
            : null;

        const food = await foodModel.create({
            name,
            description,
            price,
            foodPartner: req.foodPartner._id,
            image: imageData,
            video: videoData
        });

        res.status(201).json({
            message: "Food created successfully",
            food
        });

    } catch (err) {
        console.error("createFood error:", err);
        res.status(500).json({ message: "Server error" });
    }
}

/**
 * GET ALL FOOD (Landing page)
 */
async function getFoodItems(req, res) {
    try {
        const foods = await foodModel
            .find()
            .populate("foodPartner", "name hotelName");

        // Convert base64 to usable URLs
        const formattedFoods = foods.map(food => {
            const foodObj = food.toObject();

            // Convert image
            if (foodObj.image?.data) {
                foodObj.image = `data:${foodObj.image.contentType};base64,${foodObj.image.data}`;
            } else {
                foodObj.image = null;
            }

            // Convert video
            if (foodObj.video?.data) {
                foodObj.video = `data:${foodObj.video.contentType};base64,${foodObj.video.data}`;
            } else {
                foodObj.video = null;
            }

            return foodObj;
        });

        res.status(200).json({
            message: "Food items fetched successfully",
            foods: formattedFoods
        });

    } catch (err) {
        console.error("getFoodItems error:", err);
        res.status(500).json({ message: "Server error" });
    }
}



/**
 * LIKE / UNLIKE FOOD
 */
async function likeFood(req, res) {
    try {
        const { foodId } = req.body;
        const userId = req.user._id;

        const alreadyLiked = await likeModel.findOne({
            user: userId,
            food: foodId
        });

        if (alreadyLiked) {
            await likeModel.deleteOne({ user: userId, food: foodId });
            await foodModel.findByIdAndUpdate(foodId, {
                $inc: { likeCount: -1 }
            });
            return res.status(200).json({ message: "Food unliked successfully" });
        }

        await likeModel.create({ user: userId, food: foodId });
        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { likeCount: 1 }
        });

        res.status(201).json({ message: "Food liked successfully" });

    } catch (err) {
        console.error("likeFood error:", err);
        res.status(500).json({ message: "Server error" });
    }
}

/**
 * SAVE / UNSAVE FOOD
 */
async function saveFood(req, res) {
    try {
        const { foodId } = req.body;
        const userId = req.user._id;

        const alreadySaved = await saveModel.findOne({
            user: userId,
            food: foodId
        });

        if (alreadySaved) {
            await saveModel.deleteOne({ user: userId, food: foodId });
            await foodModel.findByIdAndUpdate(foodId, {
                $inc: { savesCount: -1 }
            });
            return res.status(200).json({ message: "Food unsaved successfully" });
        }

        await saveModel.create({ user: userId, food: foodId });
        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { savesCount: 1 }
        });

        res.status(201).json({ message: "Food saved successfully" });

    } catch (err) {
        console.error("saveFood error:", err);
        res.status(500).json({ message: "Server error" });
    }
}

/**
 * GET SAVED FOODS (User)
 */
async function getSaveFood(req, res) {
    try {
        const userId = req.user._id;

        const savedFoods = await saveModel
            .find({ user: userId })
            .populate({
                path: "food",
                populate: { path: "foodPartner", select: "name hotelName" }
            });

        res.status(200).json({
            message: "Saved foods retrieved successfully",
            savedFoods
        });

    } catch (err) {
        console.error("getSaveFood error:", err);
        res.status(500).json({ message: "Server error" });
    }
}

async function deleteFood(req, res) {
    try {
        const foodId = req.params.id;
        const foodPartner = req.foodPartner;

        if (!foodPartner) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // ✅ use foodModel (already imported)
        const food = await foodModel.findById(foodId);

        if (!food) {
            return res.status(404).json({ message: "Food item not found" });
        }

        // ✅ owner check
        if (food.foodPartner.toString() !== foodPartner._id.toString()) {
            return res.status(403).json({ message: "Not allowed to delete this food" });
        }

        await food.deleteOne();

        res.status(200).json({ message: "Food deleted successfully" });

    } catch (error) {
        console.error("DELETE FOOD ERROR:", error);
        res.status(500).json({ message: "Server error while deleting food" });
    }
}




module.exports = {
    deleteFood,
    createFood,
    getFoodItems,
    likeFood,
    saveFood,
    getSaveFood
};
