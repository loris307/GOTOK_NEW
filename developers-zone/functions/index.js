/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require("firebase-functions");
const axios = require("axios");
const admin = require("firebase-admin");
const cors = require("cors")({origin: "https://gotok-ai.com"});
const stripe = require("stripe")(functions.config().stripe.secret);


admin.initializeApp();

const firestore = admin.firestore();


exports.generateConversationStarter2 = functions.
    https.onCall(async (data, context) => {
      console.log('datttaaa ==== ',data.base64ImageData)
      const apiKey = functions.config().openai.key;
      const apiUrl = "https://api.openai.com/v1/chat/completions";

      const uid = context.auth.uid; // get user id from context

      // Verify premium status
      const isPremium = await hasActiveSubscription(uid);

      const userLimit = isPremium ? 25 : 5;

      // Transaction to get user data and update apiCallCount atomically
      await admin.firestore().runTransaction(async (transaction) => {
        const userRef = admin.firestore().collection("users").doc(uid);
        const userDoc = await transaction.get(userRef);

        if (!userDoc.exists) {
          throw new functions.https.HttpsError("not-found", "User not found");
        }

        const userData = userDoc.data();
    
        if (userData.apiCallCount >= userLimit &&
            sameDay2(userData.lastApiCall.toDate(), new Date())) {
          throw new functions.https.HttpsError(
              "resource-exhausted",
              `Reached your daily limit of ${userLimit} prompts`,
          );
        }

        if (!sameDay2(userData.lastApiCall.toDate(), new Date())) {
          userData.apiCallCount = 0;
        }

        transaction.update(userRef, {
          apiCallCount: userData.apiCallCount + 1,
          lastApiCall: new Date(),
        });
      });



//       const response = await axios.post(apiUrl, {
//         model: "gpt-3.5-turbo",

//         messages: !data.base64ImageData ? [
//           {"role": "system", "content": data.prompt},
//           {"role": "user", "content": data.concatenatedString},
//         ] :  [
//           {"role": "system", "content": data.prompt},
//           {
//             "role": "user",
//             "content": [
//               {"type": "text", "text": data.concatenatedString? data.concatenatedString: "Use what you can see in this image as context"},
//               {"type": "image", "image": {"url": `data:image/jpeg;base64,${data.base64ImageData}`}}
//             ]
//           }
//         ],
//         max_tokens: 200,
//         temperature: 0.7,
//       }, {
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${apiKey}`,
//           "OpenAI-Organization": "org-Fj6flRfb4tQM5OXbBle6a2qX",
//         },
//       });
//       /**
//       * Asynchronously checks if the user has an active Stripe subscription.
//       * @async
//       * @param {string} uid - The user's ID.
//    * @return {Promise<boolean>} -Promise tha resolves if user has active sub.
// * @throws throws error if user not exists or doesn't have a Stripe ID
//       */
//       async function hasActiveSubscription(uid) {
//         const userDoc = await admin.firestore()
//             .collection("users").doc(uid).get();

//         // If the user NO have a stripeCustomerId, return false
//         if (!userDoc.exists || !userDoc.data().stripeCustomerId) {
//           return false;
//         }

//         const customerId = userDoc.data().stripeCustomerId;

//         // List the subscriptions for the customer
//         const subscriptions = await stripe.subscriptions.list({
//           customer: customerId,
//         });

//         // Check if the user has an active subscription
//         return subscriptions.data.some((sub) => sub.status === "active");
//       }


//       // Increment the user's apiCallCount and update the lastApiCall date
//       // await admin.firestore().collection("users").doc(uid).update({
//       //   apiCallCount: userData.apiCallCount + 1,
//       //   lastApiCall: new Date(),
//       // });

      return null
    });


/**
 * Check if two dates fall on the same day
 *
 * @param {Date} d1 - The first date
 * @param {Date} d2 - The second date
 * @return {boolean} - Return true if the dates are on the same day
 */
function sameDay2(d1, d2) {
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();
}

exports.generateConversationStarter = functions.
    https.onCall(async (data, context) => {
      const apiKey = functions.config().openai.key;
      const apiUrl = "https://api.openai.com/v1/chat/completions";

      const uid = context.auth.uid; // get user id from context

      // Get user document from Firestore
      const userDoc = await admin.firestore().collection("users").doc(uid)
          .get();

      // If the user document doesn't exist, return an error
      if (!userDoc.exists) {
        throw new functions.https.HttpsError("not-found", "User not found");
      }

      const userData = userDoc.data();

      // Check if the user has already generated 25 prompts today
      if (userData.apiCallCount >= 25 &&
      sameDay(userData.lastApiCall.toDate(), new Date())) {
        throw new functions
            .https.HttpsError(
                "resource-exhausted", "Reached your daily limit of 25 prompts");
      }

      // If the user hasn't generated a prompt today, reset apiCallCount to 0
      if (!sameDay(userData.lastApiCall.toDate(), new Date())) {
        userData.apiCallCount = 0;
      }

      const response = await axios.post(apiUrl, {
        model: "gpt-3.5-turbo",
        messages: [
          {"role": "system", "content": data.prompt},
          {"role": "user", "content": data.concatenatedString},
        ],
        max_tokens: 200,
        temperature: 0.7,
      }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
          "OpenAI-Organization": "org-Fj6flRfb4tQM5OXbBle6a2qX",
        },
      });

      // Increment the user's apiCallCount and update the lastApiCall date
      await admin.firestore().collection("users").doc(uid).update({
        apiCallCount: userData.apiCallCount + 1,
        lastApiCall: new Date(),
      });

      return response.data.choices[0].message.content;
    });


    exports.generateImageConversationStarter = functions.
        https.onCall(async (data, context) => {
      const apiKey = functions.config().openai.key;
      const apiUrl = "https://api.openai.com/v1/chat/completions";
      const uid = context.auth.uid; // get user id from context
    
      // Get user document from Firestore
      const userDoc = await admin.firestore().collection("users").doc(uid).get();
    
      // If the user document doesn't exist, return an error
      if (!userDoc.exists) {
        throw new functions.https.HttpsError("not-found", "User not found");
      }
    
      const userData = userDoc.data();
    
      // Check if the user has already generated 25 prompts today
      if (userData.apiCallCount >= 25 && sameDay(userData.lastApiCall.toDate(), new Date())) {
        throw new functions.https.HttpsError("resource-exhausted", "Reached your daily limit of 25 prompts");
      }
    
      // If the user hasn't generated a prompt today, reset apiCallCount to 0
      if (!sameDay(userData.lastApiCall.toDate(), new Date())) {
        userData.apiCallCount = 0;
      }
    
      // Adjusted messages array to include base64 image data
      const messages = [
        {"role": "system", "content": data.prompt},
        {
          "role": "user",
          "content": [
            {"type": "text", "text": data.concatenatedString},
            {"type": "image", "image": {"url": `data:image/jpeg;base64,${data.base64ImageData}`}}
          ]
        }
      ];
    
      const response = await axios.post(apiUrl, {
        model: "gpt-3.5-turbo",
        messages: messages,
        max_tokens: 200,
        temperature: 0.7,
      }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
          "OpenAI-Organization": "org-Fj6flRfb4tQM5OXbBle6a2qX",
        },
      });
    
      // Increment the user's apiCallCount and update the lastApiCall date
      await admin.firestore().collection("users").doc(uid).update({
        apiCallCount: userData.apiCallCount + 1,
        lastApiCall: new Date(),
      });
    
      return response.data.choices[0].message.content;
    });
    
/**
 * Check if two dates fall on the same day
 *
 * @param {Date} d1 - The first date
 * @param {Date} d2 - The second date
 * @return {boolean} - Return true if the dates are on the same day
 */
function sameDay(d1, d2) {
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();
}

exports.deleteUserByEmail = functions.https.onRequest((request, response) => {
  // Wrap your function logic with the cors function
  cors(request, response, async () => {
    try {
      if (request.method !== "POST") {
        response.status(400).send("Bad Request: Expected POST");
        return;
      }

      // Parse the request body
      const data = request.body;

      const email = data.email;
      const db = admin.firestore();

      // Get the user by email
      const userRecord = await admin.auth().getUserByEmail(email);

      // Delete the user's Firestore document
      await db.collection("users").doc(userRecord.uid).delete();

      // Delete the user from Firebase Auth
      await admin.auth().deleteUser(userRecord.uid);

      // Send a response
      response.json({success: true});
    } catch (error) {
      console.error("Error deleting user:", error);
      response.status(500).send(error);
    }
  });
});

exports.createCheckoutSession = functions.https.onCall(async (data, context)=> {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated",
        "You must be logged in to make a purchase.");
  }

  const uid = context.auth.uid;

  // look up any stored Stripe customer ID you have in Firestore
  const userDoc = await firestore.collection("users").doc(uid).get();

  let customerId;

  if (userDoc.exists && userDoc.data().stripeCustomerId) {
    // Use the existing Stripe customer ID if found
    customerId = userDoc.data().stripeCustomerId;
  } else {
    // Otherwise, create a new Stripe customer and save to Firestore
    const customer = await stripe.customers.create({
      description: `Firebase UID: ${uid}`,
    });

    customerId = customer.id;

    // Store the new Stripe customer ID in Firestore
    await firestore.collection("users").doc(uid).set({
      stripeCustomerId: customerId,
    }, {merge: true});
  }

  // Create a SetupIntent for the customer
  const setupIntent = await stripe.setupIntents.create({
    customer: customerId,
    payment_method_types: ["card", "paypal"],
  });

  const ephemeralKey = await stripe.ephemeralKeys.create(
      {customer: customerId},
      {apiVersion: "2022-11-15"},
  );


  return {
    clientSecret: setupIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customerId,
  };
});


exports.startSubscription = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "NOT LOGGED IN");
  }

  const uid = context.auth.uid;
  const userEmail = context.auth.token.email; // <-- Get the user email


  // Retrieve the stored Stripe customer ID from Firestore
  const userDoc = await firestore.collection("users").doc(uid).get();

  if (!userDoc.exists || !userDoc.data().stripeCustomerId) {
    throw new functions.https.HttpsError("not-found", "NO STRIPE CUSTOMER ID");
  }

  const customerId = userDoc.data().stripeCustomerId;

  // First, retrieve the SetupIntent to get the payment method ID
  // Assuming you're sending the setupIntent's client secret as a parameter
  const setupIntent = await stripe.setupIntents
      .retrieve(data.clientSecret.split("_secret")[0]);
  const paymentMethodId = setupIntent.payment_method;

  // Attach the payment method to the customer
  await stripe.paymentMethods.attach(paymentMethodId, {
    customer: customerId,
  });

  // Set the payment method as the customer's default payment method
  await stripe.customers.update(customerId, {
    email: userEmail,
    invoice_settings: {
      default_payment_method: paymentMethodId,
    },
  });

  // Create a subscription for the customer
  const subscription = await stripe.subscriptions.create({
    customer: customerId,
    items: [{price: "price_1NcWxdAmn8sb0ycrMmm8Sh7f"}],
    expand: ["latest_invoice.payment_intent"],
  });

  return {
    subscriptionId: subscription.id,
    status: subscription.status,
  };
});

exports.checkSubscriptionStatus =functions.https.onCall(async (data, context)=>{
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "NOT LOGGED IN");
  }

  const uid = context.auth.uid;

  // Retrieve the stored Stripe customer ID from Firestore
  const userDoc = await firestore.collection("users").doc(uid).get();

  if (!userDoc.exists || !userDoc.data().stripeCustomerId) {
    throw new functions.https.HttpsError("not-found", "NO STRIPE CUSTOMER ID");
  }

  const customerId = userDoc.data().stripeCustomerId;

  // List the subscriptions for the customer
  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
  });

  // Check if the user has an active subscription
  const activeSubscription = subscriptions
      .data.some((sub) => sub.status === "active");

  return {
    hasActiveSubscription: activeSubscription,
  };
});

exports.cancelSubscription = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "NOT LOGGED IN");
  }

  const uid = context.auth.uid;

  // Retrieve the stored Stripe customer ID from Firestore
  const userDoc = await firestore.collection("users").doc(uid).get();

  if (!userDoc.exists || !userDoc.data().stripeCustomerId) {
    throw new functions.https.HttpsError("not-found", "NO STRIPE CUSTOMER ID");
  }

  const customerId = userDoc.data().stripeCustomerId;

  // List the subscriptions for the customer
  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
  });

  // Cancel the first active subscription found (assuming one subscription)
  const activeSubscription = subscriptions
      .data.find((sub) => sub.status === "active");

  if (!activeSubscription) {
    throw new functions.https
        .HttpsError("not-found", "NO ACTIVE SUBSCRIPTION FOUND");
  }

  const canceledSubscription = await stripe
      .subscriptions.del(activeSubscription.id);

  return {
    status: canceledSubscription.status,
  };
});

exports.getUserInvoices = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "NOT LOGGED IN");
  }

  const uid = context.auth.uid;

  // Retrieve the stored Stripe customer ID from Firestore
  const userDoc = await firestore.collection("users").doc(uid).get();

  if (!userDoc.exists || !userDoc.data().stripeCustomerId) {
    throw new functions.https.HttpsError("not-found", "NO STRIPE CUSTOMER ID");
  }

  const customerId = userDoc.data().stripeCustomerId;

  // List the invoices for the customer
  const invoices = await stripe.invoices.list({
    customer: customerId,
    limit: 10, // Adjust based on how many invoices you want to retrieve at once
  });

  // Map the data if needed to reduce the size or format of returned invoices
  const mappedInvoices = invoices.data.map((invoice) => ({
    id: invoice.id,
    amount_paid: invoice.amount_paid,
    date: invoice.created,
    status: invoice.status,
    // Add any other fields you want to send to the client
  }));

  return {
    invoices: mappedInvoices,
  };
});


exports.setDefaultPaymentMethod = functions
    .https.onCall(async (data, context) => {
      if (!context.auth) {
        throw new functions.https.HttpsError("unauthenticate", "NOT LOGGED IN");
      }

      const uid = context.auth.uid;
      const db = admin.firestore();
      // Retrieve the stored Stripe customer ID from Firestore
      const userDoc = await db.collection("users").doc(uid).get();

      if (!userDoc.exists || !userDoc.data().stripeCustomerId) {
        throw new functions.https.HttpsError("not-found", "NO STRIPE CUSTO ID");
      }

      const customerId = userDoc.data().stripeCustomerId;

      try {
        // Fetch the payment methods for the given customer ID
        const paymentMethods = await stripe.paymentMethods.list({
          customer: customerId,
          type: "card",
        });

        // Sort by creation date and get the most recent
        paymentMethods.data.sort((a, b) => b.created - a.created);
        const recentPaymentMethod = paymentMethods.data[0];

        if (!recentPaymentMethod) {
          throw new functions.https.HttpsError("not-found", "No payment");
        }

        // Set the most recent payment method as the default for the customer
        await stripe.customers.update(customerId, {
          invoice_settings: {
            default_payment_method: recentPaymentMethod.id,
          },
        });

        return {success: true, paymentMethodId: recentPaymentMethod.id};
      } catch (error) {
        console.error("Error setting default payment method:", error);
        throw new functions.https.HttpsError("internal", "An error occurred");
      }
    });
