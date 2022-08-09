const { Schema, model } = require("mongoose");

const employeeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    office: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    image: {
      type: String
    }
  },
  {
    timestamps: true,
    versionKey: false, // Delete version number from schema
  }
);

module.exports = model("Employee", employeeSchema);
