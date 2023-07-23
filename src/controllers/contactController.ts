import { Request, Response } from "express";
import { Contact, LinkPrecedence } from "../models/contact";

export const getContacts = async (req: Request, res: Response) => {
    try {
        const phoneNumber = req?.query?.phoneNumber || '';
        const email = req?.query?.email || '';
        const contact = await Contact.find({
            where: [{ phoneNumber }, { email }],
            order: { createdAt: 'DESC' },
        });
        return res.json({ contact });
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const createContact = async (req: Request, res: Response) => {
    try {
        const { phoneNumber, email } = req.body;
        if (!phoneNumber && !email) {
            res.status(400).json({ error: "Missing mandatory parameter: phoneNumber or email" });
        }

        //existing contact
        const existingContact = await Contact.find({
            where: [{ phoneNumber }, { email }],
            order: { createdAt: 'DESC' },
        });
        const contactsToSave = Contact.create([{ phoneNumber, email }]);
        const newContact = await Contact.save(contactsToSave);
        res.json(newContact);

    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export const identifyContact = async (req: Request, res: Response) => {
    try {
        const { phoneNumber = '', email = '' } = req.body;
        if (!phoneNumber && !email) {
            res.status(400).json({ error: "Missing mandatory parameter: phoneNumber or email" });
        }

        let contactList = await Contact.find({
            where: [{ phoneNumber }, { email }],
            order: { createdAt: 'ASC' },
        });

        //new registration
        if (!contactList?.length) {
            const contactsToSave = Contact.create([{ phoneNumber, email }]);
            contactList = await Contact.save(contactsToSave);
        } else {
            const contactsToSave = Contact.create({
                phoneNumber,
                email,
                linkedId: contactList[0].id,
                linkPrecedence: LinkPrecedence.secondary
            });
            const secondaryContact = await Contact.save(contactsToSave);
            contactList.push(secondaryContact);
        }

        const contact = {
            primaryContatctId: contactList[0].id,
            emails: [contactList[0].email],
            phoneNumbers: [contactList[0].phoneNumber],
            secondaryContactIds: [] as number[],
        }

        for (let idx = 1; idx < contactList.length; idx++) {
            const ct = contactList[idx];
            contact.emails.push(ct.email);
            contact.phoneNumbers.push(ct.phoneNumber);
            contact.secondaryContactIds.push(ct.id)
        }

        return res.json({ contact });

    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
