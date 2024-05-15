const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@desc    Get all contacts
//@route   GET /api/contacts
//@access  Private

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

//@desc    Create contact
//@route   POST /api/contacts
//@access  Private

const createContact = asyncHandler(async (req, res) => {
  console.log("The request body is", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("Please provide name, email and phone");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  res.status(201).json(contact);
});

//@desc    Get contact by id
//@route   GET /api/contacts/:id
//@access  Private

const getContactById = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});

//@desc    Update contact by id
///@route   PUT /api/contacts/:id
//@access  Private

const updateContactById = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Not authorized");
  }

  contact.name = req.body.name || contact.name;
  contact.email = req.body.email || contact.email;
  contact.phone = req.body.phone || contact.phone;
  const updatedContact = await contact.save();
  res.status(200).json(updatedContact);
});

//@desc    Delete contact by id
///@route   DELETE /api/contacts/:id
///@access  Private

const deleteContactById = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Not authorized");
  }

  await contact.deleteOne({ _id: req.params.id });

  res.status(200).json(contact);
});

module.exports = {
  getContacts,
  createContact,
  getContactById,
  updateContactById,
  deleteContactById,
};
