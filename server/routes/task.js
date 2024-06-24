const router = require("express").Router();
const Task = require("../models/task");
const User = require("../models/user");
const { authenticateToken } = require("./auth");

// Creating tasks
// router.post("/create-task", authenticateToken, async (req, res) => {
//   try {
//     const { title, desc } = req.body;
//     const { id } = req.headers;
//     const newTask = new Task({
//       title: title,
//       desc: desc,
//     });
//     const saveTask = await newTask.save();
//     const taskId = saveTask._id;
//     await User.findByIdAndUpdate(id, { $push: { tasks: taskId._id } });
//     res.status(200).json({ message: "Task created!" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

router.post("/create-task", authenticateToken, async (req, res) => {
  try {
    const { title, desc } = req.body;
    const userId = req.query.id; // Get the ID from query parameters

    // console.log("User ID:", userId);

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const newTask = new Task({
      title: title,
      desc: desc,
    });
    const savedTask = await newTask.save();

    // console.log("Saved Task ID:", savedTask._id);

    // Find the user and update
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { tasks: savedTask._id } },
      { new: true },
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // console.log("Updated User:", updatedUser);

    res.status(200).json({ message: "Task created and added to user!" });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get all tasks
router.get("/get-all-tasks", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate({
      path: "tasks",
      options: { sort: { createdAt: -1 } },
    });
    res.status(200).json({ data: userData?.tasks });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Delete task
router.delete("/delete-tasks/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    const userID = req.headers.id;
    await User.findOneAndUpdate(userID, { $pull: { tasks: id } });
    res.status(200).json({ message: "Task Deleted Successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update task
router.put("/update-tasks/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, desc } = req.body;
    await Task.findByIdAndUpdate(id, { title: title, desc: desc });
    res.status(200).json({ message: "Task Updated Successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update important task
router.put("/update-imp-tasks/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const taskData = await Task.findById(id);
    const imptask = taskData.important;
    await Task.findByIdAndUpdate(id, { important: !imptask });
    res.status(200).json({ message: "Task Updated Successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get all important tasks
router.get("/get-imp-tasks", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const data = await User.findById(id).populate({
      path: "tasks",
      match: { important: true },
      options: { sort: { createdAt: -1 } },
    });
    const imptaskData = data?.tasks;
    res.status(200).json({ data: imptaskData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update complete task
// router.put(
//   "/update-complete-tasks/:id",
//   authenticateToken,
//   async (req, res) => {
//     try {
//       const { id } = req.params;
//       const taskData = await Task.findById(id);
//       const completeTask = taskData.important;
//       await Task.findByIdAndUpdate(id, { complete: !completeTask });
//       res.status(200).json({ message: "Task Updated Successfully!" });
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ message: "Internal Server Error" });
//     }
//   },
// );
router.put(
  "/update-complete-tasks/:id",
  authenticateToken,
  async (req, res) => {
    try {
      const { id } = req.params;
      const taskData = await Task.findById(id);
      const completeTask = taskData.complete;
      await Task.findByIdAndUpdate(id, { complete: !completeTask });
      res.status(200).json({ message: "Task Updated Successfully!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
);

// Get all important tasks
router.get("/get-complete-tasks", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const data = await User.findById(id).populate({
      path: "tasks",
      match: { complete: true },
      options: { sort: { createdAt: -1 } },
    });
    const completetaskData = data?.tasks;
    res.status(200).json({ data: completetaskData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
