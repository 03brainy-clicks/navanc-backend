const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//  * Get Leads
const handleGetLeads = async (req, res) => {
  try {
    const { role, user_id } = req.params;
    if (role && user_id) {
      let response;
      if (role === "admin") {
        response = await prisma.lead_Data.findMany();
      } else if (role === "user") {
        response = await prisma.lead_Data.findMany({
          where: { generated_by_id: parseInt(user_id) },
        });
      }
      return res.json({ leads: response });
    }
    throw new Error("Role and user ID are required");
  } catch (error) {
    console.error("Error fetching leads:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// * Get One Lead
const handleGetLead = async (req, res) => {
  try {
    const { lead_number } = req.params;
    if (!lead_number) throw new Error("Missing lead_number parameter");

    const lead = await prisma.lead_Data.findUnique({
      where: { lead_number: lead_number },
    });

    if (!lead) throw new Error("Lead not found");

    return res.json({ lead });
  } catch (error) {
    console.error("Error fetching lead:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
 
// * Change lead Status
const handleUpdateLeadStatus = async (req, res) => {
  try {
    const { lead_number } = req.params;
    const existingLead = await prisma.lead_Data.findUnique({
      where: { lead_number: lead_number },
    });

    if (!existingLead) throw new Error("Lead not found");

    const updatedLead = await prisma.lead_Data.update({
      where: { lead_number: lead_number },
      data: { status: "acknowledge" }, // Change status to a valid one if needed
    });

    return res.json(updatedLead);
  } catch (error) {
    console.error("Error updating lead status:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// * Create Lead
const handleCreateLead = async (req, res) => {
  try {
    const {
      lead_number,
      applicant_firstname,
      applicant_lastname,
      applicant_number,
      applicant_number2,
      applicant_address1,
      applicant_address2,
      district,
      state,
      pincode,
      generated_by_id,
    } = req.body;

    if (
      !lead_number ||
      !applicant_firstname ||
      !applicant_lastname ||
      !applicant_number ||
      !applicant_address1 ||
      !district ||
      !state ||
      !pincode ||
      !generated_by_id
    ) {
      throw new Error("All fields are required");
    }

    const newLead = await prisma.lead_Data.create({
      data: {
        lead_number,
        applicant_firstname,
        applicant_lastname,
        applicant_number,
        applicant_number2,
        applicant_address1,
        applicant_address2,
        district,
        state,
        pincode,
        generated_by_id,
      },
    });

    return res
      .status(201)
      .json({ message: "Lead created successfully", lead: newLead });
  } catch (error) {
    console.error("Error creating lead:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// * Update Lead
const handleUpdateLead = async (req, res) => {
  try {
    const { lead_number } = req.params;
    const {
      applicant_firstname,
      applicant_lastname,
      applicant_number,
      applicant_number2,
      applicant_address1,
      applicant_address2,
      district,
      state,
      pincode,
    } = req.body;

    if (
      !applicant_firstname ||
      !applicant_lastname ||
      !applicant_number ||
      !applicant_address1 ||
      !district ||
      !state ||
      !pincode
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const updatedLead = await prisma.lead_Data.update({
      where: { lead_number: lead_number },
      data: {
        applicant_firstname,
        applicant_lastname,
        applicant_number,
        applicant_number2,
        applicant_address1,
        applicant_address2,
        district,
        state,
        pincode,
      },
    });

    return res.json({
      message: "Lead updated successfully",
      lead: updatedLead,
    });
  } catch (error) {
    console.error("Error updating lead:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  handleGetLeads,
  handleGetLead,
  handleUpdateLeadStatus,
  handleCreateLead,
  handleUpdateLead,
};
