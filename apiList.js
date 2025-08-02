const FormData = require("form-data");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "product_data.json");

const createSheetForm = new FormData();
createSheetForm.append("sheet_data", fs.createReadStream(filePath));
const createBoardForm = new FormData();
createBoardForm.append("board_data", fs.createReadStream(filePath));
const suggestuQuestionsForm = new FormData();
suggestuQuestionsForm.append("file", fs.createReadStream(filePath));

module.exports = [
  // Authentication APIs
  {
    name: "Email Password Login",
    method: "POST",
    url: "https://dgo2elt3cskpo.cloudfront.net/auth/email_login",
    headers: { "Content-Type": "application/json" },
    body: {
      email: "md@bursement.com",
      password: "Mehedi1Hasan1@",
    },
  },
  {
    name: "Google Login",
    method: "POST",
    url: "https://dgo2elt3cskpo.cloudfront.net/google_login?email=md@bursement.com",
    headers: { "Content-Type": "application/json" },
  },

  // Credit and Billing
  {
    name: "Manage Credit",
    method: "GET",
    url: "https://dgo2elt3cskpo.cloudfront.net/manage_credit?user_id=05f08e8c-98e3-4745-8a42-c0278f1579f5",
    headers: { "Content-Type": "application/json" },
  },
  {
    name: "Subscribe Checkout Plan",
    method: "POST",
    url: "https://dgo2elt3cskpo.cloudfront.net/subscribe-checkout-session",
    headers: { "Content-Type": "application/json" },
    body: {
      user_id: "05f08e8c-98e3-4745-8a42-c0278f1579f5",
      plan: "pro",
      billing_period: "monthly",
    },
  },
  {
    name: "Customer Portal",
    method: "POST",
    url: "https://dgo2elt3cskpo.cloudfront.net/customer-portal",
    headers: { "Content-Type": "application/json" },
    body: {
      user_id: "05f08e8c-98e3-4745-8a42-c0278f1579f5",
    },
  },

  // Sheet APIs
  {
    name: "Get Sheet List",
    method: "GET",
    url: "https://dgo2elt3cskpo.cloudfront.net/sheets/my/all?user_id=05f08e8c-98e3-4745-8a42-c0278f1579f5",
    headers: { "Content-Type": "application/json" },
  },
  {
    name: "Create Sheet",
    method: "POST",
    url: "https://dgo2elt3cskpo.cloudfront.net/create_sheet?user_id=05f08e8c-98e3-4745-8a42-c0278f1579f5&title=Automated%20Sheet%20Test",
    headers: createSheetForm.getHeaders(),
    body: createSheetForm,
  },
  {
    name: "Get Sheet",
    method: "GET",
    url: "https://dgo2elt3cskpo.cloudfront.net/get_sheet?sheet_id=69828108-b9c1-4745-abe6-080671af60ab&user_id=05f08e8c-98e3-4745-8a42-c0278f1579f5",
    headers: { "Content-Type": "application/json" },
  },
  {
    name: "Get Sheet Data",
    method: "GET",
    url: "https://dgo2elt3cskpo.cloudfront.net/get_sheet_data?sheet_id=69828108-b9c1-4745-abe6-080671af60ab&user_id=05f08e8c-98e3-4745-8a42-c0278f1579f5",
    headers: { "Content-Type": "application/json" },
  },
  {
    name: "Delete Sheet",
    method: "DELETE",
    url: "https://dgo2elt3cskpo.cloudfront.net/sheets/delete_sheet",
  },

  // Board APIs
  {
    name: "Get Board List",
    method: "GET",
    url: "https://dgo2elt3cskpo.cloudfront.net/boards/my/all?user_id=05f08e8c-98e3-4745-8a42-c0278f1579f5",
    headers: { "Content-Type": "application/json" },
  },
  {
    name: "Get Board",
    method: "GET",
    url: "https://dgo2elt3cskpo.cloudfront.net/get_board?board_id=a3110992-b80d-49e7-be2b-431c13f3f9ae&user_id=05f08e8c-98e3-4745-8a42-c0278f1579f5",
    headers: { "Content-Type": "application/json" },
  },
  {
    name: "Get Board Data",
    method: "GET",
    url: "https://dgo2elt3cskpo.cloudfront.net/get_board_data?board_id=a3110992-b80d-49e7-be2b-431c13f3f9ae&user_id=05f08e8c-98e3-4745-8a42-c0278f1579f5",
    headers: { "Content-Type": "application/json" },
  },
  {
    name: "Create Board",
    method: "POST",
    url: "https://dgo2elt3cskpo.cloudfront.net/create_board?user_id=05f08e8c-98e3-4745-8a42-c0278f1579f5&title=Automated%20Board%20Test",
    headers: createBoardForm.getHeaders(),
    body: createBoardForm,
  },
  {
    name: "Delete Board",
    method: "DELETE",
    url: "https://dgo2elt3cskpo.cloudfront.net/boards/delete_board",
  },

  // Analysis APIs
  {
    name: "Get Analysis List",
    method: "GET",
    url: "https://dgo2elt3cskpo.cloudfront.net/analysis/my/all?user_id=05f08e8c-98e3-4745-8a42-c0278f1579f5",
    headers: { "Content-Type": "application/json" },
  },
  {
    name: "Get Analysis",
    method: "GET",
    url: "https://dgo2elt3cskpo.cloudfront.net/get_analysis?id=9d9e75ae-1b4b-4763-b8f8-001e928449f8&user_id=05f08e8c-98e3-4745-8a42-c0278f1579f5",
    headers: { "Content-Type": "application/json" },
  },

  // Boost Performance APIs
  {
    name: "Suggest Questions",
    method: "POST",
    url: "https://dgo2elt3cskpo.cloudfront.net/suggest_questions",
    headers: suggestuQuestionsForm.getHeaders(),
    body: suggestuQuestionsForm,
  },
  {
    name: "Generate Title",
    method: "POST",
    url: "https://dgo2elt3cskpo.cloudfront.net/generate_title?text=Automated%20API%20Test",
    headers: { "Content-Type": "application/json" },
  },
  {
    name: "Get Artifact Chart Image",
    method: "POST",
    url: "https://dgo2elt3cskpo.cloudfront.net/get_chart_image?message_id=8049ffa3-27f3-4d33-a430-a7bb8998756a",
    headers: { "Content-Type": "application/json" },
  },

  // Kaggle Dataset
  {
    name: "Search Free Dataset",
    method: "POST",
    url: "https://dgo2elt3cskpo.cloudfront.net/search_data",
    headers: { "Content-Type": "application/json" },
    body: {
      keyword: "sales",
      page: 1,
    },
  },
  {
    name: "Download Free Dataset",
    method: "POST",
    url: "https://dgo2elt3cskpo.cloudfront.net/download_dataset",
    headers: { "Content-Type": "application/json" },
    body: {
      dataset_ref: "mikhail1681/walmart-sales",
    },
  },

  // Deep Research
  {
    name: "Verify Query",
    method: "POST",
    url: "https://dgo2elt3cskpo.cloudfront.net/verify_query?query=Using%20Tesla's%20quarterly%20revenue%20data%20from%20Q1%202021%20to%20Q4%202023,%20compare%20revenue%20growth%20rates%20against%20automotive%20industry%20average&research_id=19f08e8c-98e3-4745-8a42-c0278c1290d1",
    headers: { "Content-Type": "application/json" },
  },
];
