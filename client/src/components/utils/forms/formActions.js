

export const validate = (element, formData = []) => {
  let error = [true, ''];

  //if element is an email field
  if (element.validation.email) {
    const valid = /\S+@\S+\.\S+/.test(element.value)
    const message = `${!valid ? 'Must be a valid email' : ''}`;
    error = !valid ? [valid, message] : error;
  }
  //if element is a passoword field, check conformPassord match
  if (element.validation.confirm) {
    const valid = element.value.trim() === formData[element.validation.confirm].value
    const message = `${!valid ? 'Passwords do not match' : ''}`;
    error = !valid ? [valid, message] : error;
  }
  //if validation is required on element
  if (element.validation.required) {
    const valid = element.value.trim() !== '';
    const message = `${!valid ? 'This field is required' : ''}`;
    error = !valid ? [valid, message] : error;
  }

  return error
}

export const update = (element, formData, formName) => {
  //copy the original passed formData
  const newFormData = {
    ...formData
  }
  const newElement = {
    ...newFormData[element.id]
  }
  //change value of HTML element on input change
  newElement.value = element.event.target.value;

  if (element.blur) {
    let validData = validate(newElement, formData);
    newElement.valid = validData[0];
    newElement.validationMessage = validData[1];
  }

  newElement.touched = element.blur;
  newFormData[element.id] = newElement;

  return newFormData;
}

export const generateData = (formData, formName) => {
  let dataToSubmit = {};

  for (let key in formData) {
    if(key !== 'confirmPassword'){ //do not include confirmPassword field in data to submit
      dataToSubmit[key] = formData[key].value;
    }
  }

  return dataToSubmit;
}

export const isFormValid = (formData, formName) => {
  let formIsValid = true;

  for (let key in formData) {
    formIsValid = formData[key].valid && formIsValid
  }
  return formIsValid;

}

/**
 * @param formData -> values of form in state
 * @param dataArray -> array of objs(with _id&name) returned from server
 * @param field -> key in formData, which need to be updated with new data
 * @returns newFormdata  with options field filled with new data
 */
export const populateOptionFields = (formData, dataArray = [], field) => {
  const newArray = [];
  const newFormData = { ...formData }

  dataArray.forEach(item => {
    newArray.push({
      key: item._id,
      value: item.name
    })
  })

  newFormData[field].config.options = newArray;
  return newFormData;
}