import mongoose, {Schema} from "mongoose";
const schema = new Schema({
    name: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    opportunityId: {type: String},
    storeName: {type: String}
})
const Staff = mongoose.model("Staff",schema)
export default Staff