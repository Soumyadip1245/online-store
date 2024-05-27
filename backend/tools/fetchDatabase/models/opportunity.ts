import mongoose, { Schema } from "mongoose";
const schema = new Schema({
    storeName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    location: { type: String, required: true },
    opportunityId: { type: String },
    description: { type: String, required: true },
    timings: { type: String, required: true },
    position: { type: String, required: true }
})
const Opportunity = mongoose.model("Opportunity",schema)
export default Opportunity