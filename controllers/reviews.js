const path = require('path');
const Company = require('../models/companies');
const Review = require('../models/reviews');

exports.postdetails = (req, res, next) => {
  console.log("Received data in controller middleware");

  const { companyname, pros, cons, rating } = req.body;

  // Step 1: Check if the company already exists
  Company.findOne({ where: { companyname: companyname } })
    .then(company => {
      if (company) {
        // Company exists; update average and entries
        const updatedEntries = company.dataValues.entries + 1;
        console.log("Full company object:", company);
        console.log("company.average:", company.dataValues.average);
        console.log("company.entries:", company.dataValues.entries);
        let updatedAverage = ((company.dataValues.average * company.dataValues.entries) + rating) / (company.dataValues.entries + 1);
        console.log(updatedEntries, updatedAverage, " getting test 1 done 4545")
        return company.update({ average: updatedAverage, entries: updatedEntries })
          .then(updatedCompany => {
            // Add a review for the existing company
            return Review.create({
              pros: pros,
              cons: cons,
              companyId: updatedCompany.id
            });
          })
          .then(review => {
            console.log('Created Review for Existing Company:', review);
            res.status(201).json({
              message: "Review added to existing company successfully",
              company: {
                id: company.id,
                name: companyname,
                average: company.average,
                entries: company.entries
              },
              review: {
                id: review.id,
                pros: review.pros,
                cons: review.cons
              }
            });
          });
      } else {
        // Company does not exist; create a new one
        return Company.create({
          companyname: companyname,
          average: rating, // Initial average set to the review value
          entries: 1 // New company starts with 1 review entry
        })
          .then(newCompany => {
            console.log('Created New Company:', newCompany);

            // Add the first review for the new company
            return Review.create({
              pros: pros,
              cons: cons,
              companyId: newCompany.id
            });
          })
          .then(review => {
            console.log('Created Review for New Company:', review);
            res.status(201).json({
              message: "Company and Review created successfully",
              company: {
                id: review.companyId,
                name: companyname,
                average: rating,
                entries: 1
              },
              review: {
                id: review.id,
                pros: review.pros,
                cons: review.cons
              }
            });
          });
      }
    })
    .catch(err => {
      console.error('Error creating company or review:', err);
      res.status(500).json({
        error: "Failed to create company or review",
        details: err.message
      });
    });
};

exports.baseroot = (req, res, next) => {
  console.log("Serving htmlmain.html");
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
};
