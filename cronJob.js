const cron = require("node-cron");
const axios = require("axios");
const apiList = require("./apiList");
const sendErrorEmail = require("./mailer");

function logResult(name, status, message) {
  console.log(
    `\n[${new Date().toISOString()}] ${name}: ${status} - ${message}`
  );
}

const USER_ID = "05f08e8c-98e3-4745-8a42-c0278f1579f5";

const handleCallGetRequest = async (api) => {
  try {
    const response = await axios.get(api.url, {
      headers: api.headers || {},
    });
    return response;
  } catch (error) {
    // Attach the API name to the error for better error handling
    error.apiName = api.name;
    throw error;
  }
};

const handleCreateDeleteSheet = async (api) => {
  const config = {
    method: api.method,
    url: api.url,
    headers: api.headers || {},
    data: api.body || {},
    maxBodyLength: Infinity, // in case large file upload
  };

  const createResp = await axios(config);

  if (createResp.status === 200 && createResp.data?.sheet_id) {
    logResult(
      api.name,
      "SUCCESS",
      `Sheet created with ID: ${createResp.data.sheet_id}`
    );

    // Find the Delete Sheet API config from the list
    const deleteApi = apiList.find((a) => a.name === "Delete Sheet");
    if (deleteApi) {
      // Build URL with dynamic query parameters
      const deleteUrl = `${deleteApi.url}?user_id=${USER_ID}&sheet_id=${createResp.data.sheet_id}`;
      const deleteConfig = {
        method: deleteApi.method,
        url: deleteUrl,
      };

      try {
        const deleteResp = await axios(deleteConfig);
        if (deleteResp.status === 200) {
          logResult(
            "Delete Sheet",
            "SUCCESS",
            `Deleted sheet ID: ${createResp.data.sheet_id}`
          );
        } else {
          const msg = `Delete Sheet failed with status ${deleteResp.status}`;
          await sendErrorEmail("API Test Failed: Delete Sheet", msg);
          logResult("Delete Sheet", "FAILED", msg);
        }
      } catch (delErr) {
        const msg = `Delete Sheet error: ${delErr.message}`;
        await sendErrorEmail("API Test Error: Delete Sheet", msg);
        logResult("Delete Sheet", "FAILED", msg);
      }
    } else {
      logResult("Delete Sheet", "FAILED", "Delete Sheet API config not found");
    }
  } else {
    const msg = `Create Sheet failed or no sheet_id in response`;
    await sendErrorEmail("API Test Failed: Create Sheet", msg);
    logResult(api.name, "FAILED", msg);
  }
};

const handleCreateDeleteBoard = async (api) => {
  const config = {
    method: api.method,
    url: api.url,
    headers: api.headers || {},
    data: api.body || {},
    maxBodyLength: Infinity, // in case large file upload
  };

  const createResp = await axios(config);

  if (createResp.status === 200 && createResp.data?.board_id) {
    logResult(
      api.name,
      "SUCCESS",
      `Board created with ID: ${createResp.data.board_id}`
    );

    // Find the Delete Sheet API config from the list
    const deleteApi = apiList.find((a) => a.name === "Delete Board");
    if (deleteApi) {
      // Build URL with dynamic query parameters
      const deleteUrl = `${deleteApi.url}?user_id=${USER_ID}&board_id=${createResp.data.board_id}`;
      const deleteConfig = {
        method: deleteApi.method,
        url: deleteUrl,
      };

      try {
        const deleteResp = await axios(deleteConfig);
        if (deleteResp.status === 200) {
          logResult(
            "Delete Board",
            "SUCCESS",
            `Deleted Board ID: ${createResp.data.board_id}`
          );
        } else {
          const msg = `Delete Board failed with status ${deleteResp.status}`;
          await sendErrorEmail("API Test Failed: Delete Board", msg);
          logResult("Delete Board", "FAILED", msg);
        }
      } catch (delErr) {
        const msg = `Delete Board error: ${delErr.message}`;
        await sendErrorEmail("API Test Error: Delete Board", msg);
        logResult("Delete Board", "FAILED", msg);
      }
    } else {
      logResult("Delete Board", "FAILED", "Delete Board API config not found");
    }
  } else {
    const msg = `Create Board failed or no board_id in response`;
    await sendErrorEmail("API Test Failed: Create Board", msg);
    logResult(api.name, "FAILED", msg);
  }
};

const runApiTests = async () => {
  for (const api of apiList) {
    try {
      // Special case for Create Sheet API to chain Delete Sheet after success
      if (api.name === "Create Sheet") {
        handleCreateDeleteSheet(api);
        continue; // skip to next API after handling Create & Delete
      } else if (api.name === "Create Board") {
        handleCreateDeleteBoard(api);
        continue; // skip to next API after handling Create & Delete
      } else if (api.name === "Delete Sheet" || api.name === "Delete Board") {
        // Skip Delete Sheet here because it's called dynamically after Create Sheet
        continue;
      }

      // Handle GET requests with the external function
      if (api.method === "GET") {
        const response = await handleCallGetRequest(api);

        if (response.status !== 200) {
          const message = `${api.name} failed\nEndpoint: ${api.url}\nStatus: ${
            response.status
          }\nResponse: ${JSON.stringify(response.data)}`;
          await sendErrorEmail(`API Test Failed: ${api.name}`, message);
          logResult(api.name, "FAILED", message);
        } else {
          logResult(api.name, "SUCCESS", `Status: ${response.status}`);
        }
      } else {
        // Default API call for non-GET methods
        const config = {
          method: api.method,
          url: api.url,
          headers: api.headers || {},
          data: api.body || {},
        };

        const response = await axios(config);

        if (response.status !== 200) {
          const message = `${api.name} failed\nEndpoint: ${api.url}\nStatus: ${
            response.status
          }\nResponse: ${JSON.stringify(response.data)}`;
          await sendErrorEmail(`API Test Failed: ${api.name}`, message);
          logResult(api.name, "FAILED", message);
        } else {
          logResult(api.name, "SUCCESS", `Status: ${response.status}`);
        }
      }
    } catch (error) {
      const status = error.response?.status;
      const data = error.response?.data;
      const errorMessage =
        data?.message || JSON.stringify(data) || error.message;

      const message = `${api.name} ERROR\nEndpoint: ${api.url}\nStatus: ${
        status || "No status"
      }\nError Message: ${errorMessage}`;
      await sendErrorEmail(`API Test Error: ${api.name}`, message);
      logResult(api.name, "FAILED", message);
    }
  }
};

module.exports = () => {
  cron.schedule("0 */12 * * *", async () => {
    console.log("⏰ Running scheduled API tests...");
    await runApiTests();
  });
};
