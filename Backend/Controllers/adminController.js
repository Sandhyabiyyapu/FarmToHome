const Farmer = require('../Models/Farmer');

// Get all pending farmers (not approved yet)
exports.getPendingFarmers = async (req, res) => {
  try {
    const pendingFarmers = await Farmer.find({ isApproved: false })
      .select('-password') // Exclude password from response
      .sort({ createdAt: -1 }); // Newest first
    
    res.json(pendingFarmers);
  } catch (error) {
    console.error('Error fetching pending farmers:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all farmers (both approved and pending)
exports.getAllFarmers = async (req, res) => {
  try {
    const allFarmers = await Farmer.find()
      .select('-password') // Exclude password from response
      .sort({ createdAt: -1 }); // Newest first
    
    res.json(allFarmers);
  } catch (error) {
    console.error('Error fetching all farmers:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Approve a farmer
exports.approveFarmer = async (req, res) => {
  try {
    const { farmerId } = req.params;
    
    const farmer = await Farmer.findById(farmerId);
    if (!farmer) {
      return res.status(404).json({ message: 'Farmer not found' });
    }
    
    farmer.isApproved = true;
    await farmer.save();
    
    res.json({ 
      message: 'Farmer approved successfully',
      farmer: {
        _id: farmer._id,
        name: farmer.name,
        email: farmer.email,
        phone: farmer.phone,
        location: farmer.location,
        isApproved: farmer.isApproved,
        createdAt: farmer.createdAt
      }
    });
  } catch (error) {
    console.error('Error approving farmer:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Reject a farmer
exports.rejectFarmer = async (req, res) => {
  try {
    const { farmerId } = req.params;
    
    const farmer = await Farmer.findById(farmerId);
    if (!farmer) {
      return res.status(404).json({ message: 'Farmer not found' });
    }
    
    // Option 1: Delete the farmer completely
    await Farmer.findByIdAndDelete(farmerId);
    
    // Option 2: Keep the farmer but mark as rejected (uncomment if you prefer this)
    // farmer.isApproved = false;
    // await farmer.save();
    
    res.json({ message: 'Farmer rejected and removed successfully' });
  } catch (error) {
    console.error('Error rejecting farmer:', error);
    res.status(500).json({ message: 'Server error' });
  }
}; 