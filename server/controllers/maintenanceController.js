import Maintenance from "../models/Maintenance.js";
import Resident from "../models/Resident.js";

// Create Maintenance Request
export const createMaintenance = async (req, res) => {
  try {
    const resident = await Resident.findOne({ userId: req.user.id });

    if (!resident) {
      return res.status(404).json({ message: "Resident profile not found" });
    }

    const { issue, priority } = req.body;

    if (!issue || !priority) {
      return res.status(400).json({ message: "Issue and priority required" });
    }

    const request = await Maintenance.create({
      resident: resident._id,
      room: resident.room,
      issue,
      priority,
      status: "pending",
      assignedTo: null,
    });

    res.status(201).json(request);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error Creating Maintenance" });
  }
};


// Get All Requests (Admin)
export const getMaintenance = async (req, res) => {
  try {
    const requests = await Maintenance.find()
      .populate("resident")
      .populate("assignedTo")
      .populate("room");

    res.status(200).json(requests);

  } catch (error) {
    res.status(500).json({ message: "Error Fetching Requests" });
  }
};


// Get Resident Own Requests
export const getMyMaintenance = async (req, res) => {
  try {
    const resident = await Resident.findOne({ userId: req.user.id });

    const requests = await Maintenance.find({ resident: resident._id })
      .populate("room")
      .populate("assignedTo");

    res.status(200).json(requests);

  } catch (error) {
    res.status(500).json({ message: "Error Fetching Your Requests" });
  }
};


// Assign Technician
export const assignMaintenance = async (req, res) => {
  try {
    const { technicianId } = req.body;

    if (!technicianId) {
      return res.status(400).json({ message: "Technician ID required" });
    }

    const maintenance = await Maintenance.findById(req.params.id);

    if (!maintenance) {
      return res.status(404).json({ message: "Maintenance not found" });
    }

    maintenance.assignedTo = technicianId;
    maintenance.status = "in-progress";

    await maintenance.save();

    res.status(200).json({
      message: "Technician assigned successfully",
      maintenance,
    });

  } catch (error) {
    res.status(500).json({ message: "Error assigning technician" });
  }
};


// Update Status (Technician)
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status required" });
    }

    const request = await Maintenance.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.status(200).json(request);

  } catch (error) {
    res.status(500).json({ message: "Error Updating Status" });
  }
};


// Filter by Priority
export const getPriorityMaintenance = async (req, res) => {
  try {
    const { priority } = req.query;

    const requests = await Maintenance.find({ priority })
      .populate("resident")
      .populate("room");

    res.status(200).json(requests);

  } catch (error) {
    res.status(500).json({ message: "Error Fetching Priority Requests" });
  }
};


//  Pending Requests
export const getPendingMaintenance = async (req, res) => {
  try {
    const requests = await Maintenance.find({ status: "pending" })
      .populate("resident")
      .populate("room");

    res.status(200).json(requests);

  } catch (error) {
    res.status(500).json({ message: "Error Fetching Pending Requests" });
  }
};