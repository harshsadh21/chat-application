import User from "../models/userModel.js";
export const getUserSidebar = async (req, res) => {
  try {
    const logginedUserId = req.user._id;

    const filteredUsers = await User.find({
      _id: { $ne: logginedUserId },
    }).select("-password");
    return res.status(200).json(filteredUsers);
  } catch (error) {
    console.log(error.messsage);
    return res.status(500).json({ error: "internal server error " });
  }
};
