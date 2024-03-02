import { isValidObjectId } from "mongoose";
import Address from "../model/address.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getAddress = async (req, res) => {
  let { page, limit } = req.query;
  page = page ? parseInt(page, 10) : 1;
  limit = limit ? parseInt(limit, 10) : 10;
  const skip = (page - 1) * limit;

  try {
    const addresses = await Address.find().limit(limit).skip(skip);
    const total = await Address.countDocuments();

    res.send({ data: addresses, total, page, limit });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const addAddress = async (req, res) => {
  try {
    const { street, city, state, zip } = req.body.body;
    let existingAddr = await Address.findOne({
      $and: [{ street }, { city }, { state }, { zip }],
    });
    if (existingAddr)
      return res.status(409).json({
        msg: "This address already exists.",
      });
    const newAddress = await Address.create({
      street: street,
      city: city,
      state,
      zip,
    });

    res
      .status(201)
      .json(
        new ApiResponse(
          201,
          newAddress,
          "New address has been added successfully"
        )
      );
  } catch (error) {
    console.log(error);
    return res.status(error.status || 500).json({
      status: error?.statusCode || 400,
      msg:
        error?.message ||
        `Failed to create a new address with the provided data`,
    });
  }
};

const updateAddress = async (req, res) => {
  try {
    const { street, city, state, zip } = req.body;
    let existingAddr = await Address.findOne({
      $and: [{ street }, { city }, { state }, { zip }],
    });
    if (existingAddr)
      return res.status(409).json({
        msg: "This address already exists.",
      });
    const address = await Address.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    if (!address) {
      return res.status(404).json({
        status: 404,
        msg: "The requested resource could not be found.",
      });
    }
    return res
      .status(200)
      .json(new ApiResponse(200, address, "Address updated Successfully"));
  } catch (error) {
    res.status(500).json({
      status: error?.status || 500,
      msg:
        error?.message ||
        `Failed to update the address with id ${req.params.id}`,
    });
  }
};

// Delete an address
const deleteAddress = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(404).json({
        msg: "Invalid Request",
      });
    }
    // console.log(req.params.id);
    const address = await Address.findByIdAndDelete(req.params.id);
    // console.log("address", address);
    if (!address) {
      return res.status(404).json({
        msg: "This address is not present in our records.",
      });
    }
    return res
      .status(200)
      .json(
        new ApiResponse(200, null, "The address has been deleted successfully.")
      );
  } catch (error) {
    return res.status(404).json({
      msg: error?.message || "Something went wrong while deleting the address.",
    });
  }
};

export { getAddress, addAddress, updateAddress, deleteAddress };
