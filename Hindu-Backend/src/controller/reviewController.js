const Review = require('../model/reviewModel');
const Company = require('../model/companyModel');
const { formatDateTime } = require('../utility/helper');


// API to add users comments for any company
exports.userReview = async (req,res)=>{

    try {
        const { companyId, reviewerName, rating, comment } = req.body;
        console.log('req body:',req.body);

        const company = await Company.findById(companyId);
        if (company) {
            company.reviewCount += 1;
            company.averageRating = ((company.averageRating * (company.reviewCount - 1)) + rating) / company.reviewCount;
            await company.save();
        }else{
            console.log('No company to comment');
            res.status(500).json({msg:"No company to add comment for ."})
        }

        const review = new Review({
            companyId,
            reviewerName,
            rating,
            comment,
            reviewDate:formatDateTime(),
        });

        await review.save();


        res.status(201).json(review);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message ,error:err});
    }
}

// API to get all reviews for a specific company
exports.getCompanyReviews = async (req, res) => {
    try {
        const { companyId } = req.params;

        // Check if the company exists
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({ message: "Company not found" });
        }

        // Fetch all reviews for the company, sorted by reviewDate in descending order
        const reviews = await Review.find({ companyId }).sort({ reviewDate: -1 });

        res.status(200).json({ 
            company: {
                name: company.name,
                totalReviews: company.reviewCount,
                averageRating: company.averageRating
            },
            reviews 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message, error: err });
    }
};


