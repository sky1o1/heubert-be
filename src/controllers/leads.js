const connectDB = require("../../config/db");
const ErrorResponse = require("../../utills/errorResponse");
const asyncHandler = require("../../middleware/async");

// @desc  Get all leads
// @route  Get /leads
// @access  Public

exports.getLeads = asyncHandler(async (req, res, next) => {
  var sql = "SELECT * from datas";
  connectDB.query(sql, function (error, result) {
    if (error) {
      return next(new ErrorResponse(`Datas not found`, 404));
    }
    return res.status(200).json({
      success: true,
      count: result.length,
      data: result,
    });
  });
});

// @desc  Filter datas by leadOrigin and leadSource
// @route  Get /leads/filter?leadOrigin=data&leadSource=data
// @access  Public

exports.getLeadsByLeadSource = asyncHandler(async (req, res, next) => {
  var sql = `
   SELECT leadNumber, leadSource FROM datas WHERE leadSource = "Direct Traffic";
   SELECT leadNumber, leadSource FROM datas WHERE leadSource = "Google";
   SELECT leadNumber, leadSource FROM datas WHERE leadSource = "Olark Chat";
   SELECT leadNumber, leadSource FROM datas WHERE leadSource = "Organic Search";
   SELECT leadNumber, leadSource FROM datas WHERE leadSource = "Referral Sites";
   SELECT leadNumber, leadSource FROM datas WHERE leadSource = "Welingak Website";
   `;
  connectDB.query(sql, function (error, result) {
    if (error) {
      return next(new ErrorResponse(`Datas not found`, 404));
    }
    return res.status(200).json({
      success: true,
      count: result.length,
      data: result.map((x) => x),
    });
  });
});

// @desc  Filter datas by  leadSource
// @route  Get /leads/filter?leadSource=datas
// @access  Public

exports.getLeadsOriginByLeadSource = asyncHandler(async (req, res, next) => {
  var sql = `
  SELECT leadOrigin, leadOrigin FROM datas WHERE leadSource = "${req.query.leadSource}" AND leadOrigin = "API";
  SELECT leadOrigin, leadOrigin FROM datas WHERE leadSource = "${req.query.leadSource}" AND leadOrigin = "Landing Page Submission";
  SELECT leadOrigin, leadOrigin FROM datas WHERE leadSource = "${req.query.leadSource}" AND leadOrigin = "Lead Add Form" ;
  SELECT leadOrigin, leadOrigin FROM datas WHERE leadSource = "${req.query.leadSource}" AND leadOrigin = "Lead Import";
  SELECT leadOrigin, leadOrigin FROM datas WHERE leadSource = "${req.query.leadSource}" AND leadOrigin = "Quick Add Form";
   `;
  connectDB.query(sql, function (error, result) {
    if (error) {
      return next(new ErrorResponse(`Datas not found`, 404));
    }
    return res.status(200).json({
      success: true,
      count: result.length,
      data: result,
    });
  });
});
