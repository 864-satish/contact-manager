import express from "express";
import {
    getContacts,
    createContact,
    identifyContact
} from "../controllers/contactController";

const router = express.Router();

router.get("/contacts", getContacts);
router.post("/contacts", createContact);
router.post("/identify", identifyContact);

export default router;
