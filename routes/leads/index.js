const { Router } = require("express");
const {
  handleCreateLead,
  handleGetLead,
  handleGetLeads,
  handleUpdateLead,
  handleUpdateLeadStatus,
} = require("../../controller/leads");

const router = Router();

// Get leads
router.get("/:role/:user_id", handleGetLeads);

// Get lead
router.get("/:lead_number", handleGetLead);

// Update lead
router.put("/:lead_number", handleUpdateLead);

// Update lead status
router.put("/status/:lead_number", handleUpdateLeadStatus);

// Create lead
router.post("/", handleCreateLead);

module.exports = router;
