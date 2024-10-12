document.addEventListener('DOMContentLoaded', function() {
  const ratings = document.querySelectorAll('.rating img');
  const submitBtn = document.querySelector('.submit-btn');
  const feedbackForm = document.querySelector('.feedback-form');
  const finishForm = document.querySelector('.feedback-respond');

  let selectedRating = '';

  ratings.forEach((rating) => {
      rating.addEventListener('click', function() {
          // Reset all rating images to grayscale
          ratings.forEach((img) => img.style.filter = 'grayscale(100%)');
          
          // Remove grayscale filter of the clicked rating (highlight the clicked emoji)
          this.style.filter = 'none';
          
          // Get the rating stored in this variable
          selectedRating = this.name;
      });
  });
  
  submitBtn.addEventListener('click', function() {
    if (selectedRating !== '') {
      feedbackForm.style.opacity = 0;
      finishForm.style.opacity = 1;
      finishForm.style.visibility = 'visible';

      // After 5 seconds, go back to feedback form
      setTimeout(() => {
        feedbackForm.style.opacity = 1;
        finishForm.style.opacity = 0;
        finishForm.style.visibility = 'hidden';
      }, 5000);
      
      
      // console.log(selectedRating);

      // Send the selected rating to the server
      fetch('/submit-rating', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ rating: selectedRating })
      })
      .then(response => response.json())
      .then(data => {
        console.log(data.message); // Handle server response
      })
      .catch(error => console.error('Error:', error));

      reset();
    }
  });

  // Reset all inputs and ratings
  function reset() {
    selectedRating = '';
    ratings.forEach((img) => img.style.filter = 'grayscale(100%)');
  }
});
