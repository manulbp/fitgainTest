import express from "express";
import { addReview, loadMyReviews, loadAllReviews } from "../controllers/reviewController.js";

const reviewRoutes = express.Router();

reviewRoutes.post("/add", addReview);
reviewRoutes.post("/my-reviews", loadMyReviews);
reviewRoutes.get("/all-reviews", loadAllReviews);

export default reviewRoutes;