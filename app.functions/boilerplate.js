// Main reference: https://developers.hubspot.com/docs/cms/data/serverless-functions/reference
/*
 * Preloaded packages: @hubspot/api-client: ^1.0.0-beta
 * axios: ^0.19.2
 * request: ^2.88.0
 * requests: ^0.2.2
 */
// Require axios library, to make API requests.
const axios = require("axios");
// You'll have to use Webpack to require libraries that aren't preloaded (any @google-cloud library)

// Environment variables from your serverless.json
const APIKEY = process.env.APIKEY;

const GLOBAL_CONST = "Function constant";

exports.main = async ({ params, body, accountId, contact }, sendResponse) => {
  // Env var check
  if (!APIKEY) {
    sendResponse({
      statusCode: 403,
      body: { message: "APIKEY not present" },
    });
  }

  // Auth check
  /*
   *  Hubspot provides the @contact prop that gives user info
   *  @listMemberships is a list of ids that refer to hubspot membership lists.
   *  Membership lists are contact lists used to restrict access to the portal.
   */
  if (
    !contact ||
    !contact.isLoggedIn ||
    //TODO: Replace '616' with the id of the membership list used to privatize the portal
    !contact.listMemberships.includes(616)
  ) {
    sendResponse({
      statusCode: 401,
      body: {
        message: "User is not authenticated",
      },
    });
    return;
  }

  // Do stuff


  // Send response
  sendResponse({
    body: { message: "my response" },
    statusCode: 200,
  });
};
