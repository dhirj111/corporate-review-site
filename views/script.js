

console.log("line 01 working of script.js")
// Default form submission handler
const defaultFormSubmit = (event) => {
  event.preventDefault();
  console.log("here js event hitted")
  const userDetails = {
    companyname: event.target.companyname.value,
    pros: event.target.pros.value,
    cons: event.target.cons.value,
    rating: Number(event.target.rating.value)
  };
  axios
    .post("http://localhost:7000/userDetails", userDetails)
    .then((response) => {
      alert('Product created successfully!');
      // fetchData(); // Refresh the list
      // form.reset(); // Clear the form
    })
    .catch((error) => {
      console.error('Error details:', error.response ? error.response.data : error.message);
      alert('Failed to create product');
    });
  // console.log(userDetails)
};

// let selectElement = document.querySelector("#type");

// //stored value in category
// let etype =
//   selectElement.options[selectElement.options.selectedIndex].textContent;
// console.log(etype)
// const userDetails = {
//   expense: event.target.expense.value,
//   description: event.target.description.value,
//   type: etype,
// };
// console.log(userDetails)
// axios
//   .post("http://localhost:5000/appointmentData", userDetails)
//   .then((response) => {
//     alert('Product created successfully!');
//     fetchData(); // Refresh the list
//     form.reset(); // Clear the form
//   })
//   .catch((error) => {
//     console.error('Error details:', error.response ? error.response.data : error.message);
//     alert('Failed to create product');
//   });

let form = document.getElementById("appointmentForm");
// Set the default form submit handler
form.addEventListener("submit", defaultFormSubmit);