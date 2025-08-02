const express = require('express');
const router = express.Router();
const { getPendingFarmers, approveFarmer, rejectFarmer, getAllFarmers } = require('../Controllers/adminController');

// Get all pending farmers (not approved yet)
router.get('/pending-farmers', getPendingFarmers);

// Get all farmers (approved and pending)
router.get('/all-farmers', getAllFarmers);

// Approve a farmer
router.put('/approve-farmer/:farmerId', approveFarmer);

// Reject a farmer
router.put('/reject-farmer/:farmerId', rejectFarmer);

module.exports = router; 