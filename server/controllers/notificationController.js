import Notification from "../models/Notification.js";

// Get My Notifications

export const getMyNotifications = async (req, res) => {
  try {
    const notifications = await Notification
      .find({ user: req.user.id })
      .sort({ createdAt: -1 });  

    res.status(200).json(notifications);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error Fetching Notifications" });
  }
};


export const markAsRead = async (req,res) => {
    try {
        await Notification.findByIdAndUpdate(req.params.id,{read:true});
        res.status(200).json({message:"Notification Marked As Read"});
    } catch (error) {
       res.status(500).json({ message: "Error Fetching Notifications" }); 
    }
}