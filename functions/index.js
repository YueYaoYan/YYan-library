const {onRequest, on} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});
const rateLimiter = require("express-rate-limit");
const {
  onDocumentWritten,
  Change,
  FirestoreEvent,
  onDocumentCreated,
  onDocumentUpdated,
} = require("firebase-functions/v2/firestore");

const limiter = rateLimiter({
  windowMs: 60 * 1000, // 1min
  max: 10,
  message: "Too many requests",
});

admin.initializeApp();
exports.countBooks = onRequest((req, res) => {
  limiter(req, res, () => {
    cors(req, res, async () => {
      try {
        const booksCollection = admin.firestore().collection("books");
        const snapshot = await booksCollection.get();
        const count = snapshot.size;

        res.status(200).send({count});
      } catch (error) {
        logger.log("Error counting books: ", error.message);
        res.status(500).send("Error counting books");
      }
    });
  });
});


exports.getBooks = onRequest((req, res) => {
  limiter(req, res, () => {
    cors(req, res, async () => {
      try {
        const booksCollection = admin.firestore().collection("books");
        const snapshot = await booksCollection.get();
        const booksArray = [];
        snapshot.forEach((doc) => {
          booksArray.push({ id: doc.id, ...doc.data() });
        });

        res.status(200).send({booksArray});
      } catch (error) {
        logger.log("Error getting books: ", error.message);
        res.status(500).send("Error getting all books");
      }
    });
  });
});

exports.uppercaseBooks = onDocumentWritten("books/{documentId}", (event) => {
  const original = event.data.after.data().name;
  logger.log("Uppercasing", event.params.documentId, original);
  const name = original.toUpperCase();
  if(original == name) {
    return null;
  }
  return event.data.after.ref.set({name: name}, {merge: true});
});
