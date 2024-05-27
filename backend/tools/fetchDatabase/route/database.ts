import Opportunity from "../models/opportunity";
import Staff from "../models/staff";
import { Router } from "express";
import { generateUniqueString } from "./util";
const router = Router()
router.post("/postOpportunity", async (req, res) => {
    try {
        const opportunity = new Opportunity({
            opportunityId: generateUniqueString(),
            ...req.body
        })
        await opportunity.save()
        res.json({ message: `Opportunity posted with id : ${opportunity.opportunityId}` }).status(200)
    }
    catch (e: any) {
        res.status(500).json({ message: e.message })
    }
})
router.get("/getOpportunity", async (req, res) => {
    try {
        const opportunity = await Opportunity.find()
        res.status(200).json({ message: opportunity })
    }
    catch (e: any) {
        res.json({ message: e.message }).status(500)
    }
})
router.post("/applyPosition", async (req, res) => {
    try {
        const staff = new Staff(req.body)
        await staff.save()
        res.status(200).json({ message: `Applied to opportunity id: ${staff.opportunityId}` })
    }
    catch (e: any) {
        res.status(500).json({ message: e.message })
    }
})
router.post("/getStaff", async (req, res) => {
    try {
        const staff = await Staff.find({ opportunityId: req.body.opportunityId })
        res.status(200).json({ message: staff })
    }
    catch (e: any) {
        res.status(500).json({ message: e.message })
    }
})
router.post("/getOpportunitybyId", async (req, res) => {
    try {
        const opportunity = await Opportunity.findOne({ opportunityId: req.body.opportunityId })
        res.status(200).json({ message: opportunity })
    }
    catch (e: any) {
        res.status(500).json({ message: e.message })
    }
})
router.delete("/deleteOpportunity", async (req, res) => {
    try {
        const opportunity = await Opportunity.deleteOne({ opportunityId: req.body.opportunityId })
        res.status(200).json({ message: "Opportunity removed" })
    }
    catch (e: any) {
        res.status(500).json({ message: e.message })
    }
})
export default router