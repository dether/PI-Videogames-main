const Validate = (input) => {
  const errors = { isValid: true };
  const regexName = /^[a-zA-Z0-9\s]+$/;
  const regexUrl = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp))/;
  const regexRating = /^\d+(\.\d{2})?$/
  const today = new Date();
  const releasedDate = new Date(input.released);

  // validate name
  if (!input.name) {
    errors.name = "This field is required";
    errors.isValid = false;
  } else if (input.name.length > 30 || input.name.length < 3) {
    errors.name = "Must contain between 3 and 30 characters";
    errors.isValid = false;
  } else if (!regexName.test(input.name)) {
    errors.name = "Enter a valid name";
    errors.isValid = false;
  }

  // validate URL
  if (!input.image.length) {
    errors.image = "This field is required";
    errors.isValid = false;
  } else if (!regexUrl.test(input.image)) {
    errors.image = "Enter a valid URL";
    errors.isValid = false;
  }

  // validate released date
  if (!input.released.length) {
    errors.released = "This field is required";
    errors.isValid = false;
  } else if (
    releasedDate.getFullYear() > today.getFullYear()){
    errors.released = "Enter a valid date";
    errors.isValid = false;
  } else if(releasedDate.getFullYear() === today.getFullYear() &&
  releasedDate.getMonth() > today.getMonth()){
    errors.released = "Enter a valid date";
    errors.isValid = false;
  } else if(releasedDate.getFullYear() === today.getFullYear() &&
  releasedDate.getMonth() === today.getMonth() &&
  releasedDate.getDate() > today.getDate()){
    errors.released = "Enter a valid date";
    errors.isValid = false;
  }

// validate description
if (!input.description.length) {
  errors.description = "This field is required";
  errors.isValid = false;
} else if (input.description.length <= 10) {
  errors.description = "Must contain at least 10 characters";
  errors.isValid = false;
}

// validate rating
if (!input.rating.length) {
  errors.rating = "This field is required";
  errors.isValid = false;
} else if (!regexRating.test(input.rating)) {
  errors.rating = "Enter a valid rating ( 0.00 - 5.00)";
  errors.isValid = false;
} else {
  const rating = parseFloat(input.rating);
  if (rating < 0.01 || rating > 5.00) {
    errors.rating = "Rating must be between 0.01 and 5.00";
    errors.isValid = false;
  }
}

// validate
if (input.genres.length === 0) {
  errors.genres = "Select at least one genre";
  errors.isValid = false;
}

return errors;
}

export default Validate;