const express = require("express");
const router = express.Router();
const {
  getLeads,
  getLeadsByLeadSource,
  getLeadsOriginByLeadSource,
} = require("../controllers/leads");

router.route("/").get(getLeads);
router.route("/leadsource").get(getLeadsByLeadSource);
router.route("/leadorigin").get(getLeadsOriginByLeadSource);

module.exports = router;
