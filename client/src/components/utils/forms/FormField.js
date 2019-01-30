import React from 'react';

const Formfield = ({ formData, change, id }) => {


  const showError = () => {
    let errorMessage = null;

    if (formData.validation && !formData.valid) {
      errorMessage = (
        <div className="error_label">
          {formData.validationMessage}
        </div>
      )
    }

    return errorMessage;
  }


  const renderTemplate = () => {
    let formTemplate = null;

    switch (formData.element) {
      case ('input'):
        formTemplate = (
          <div className="formBlock">
          {
            formData.showLabel?
              <div className="label_inputs">{formData.config.label}</div>
            : null
          }
            <input
              {...formData.config}
              value={formData.value}
              onBlur={(event) => change({ event, id, blur: true })}
              onChange={(event) => change({ event, id })}
            />
            {showError()}
          </div>
        )
        break;
      case ('select'):
        formTemplate = (
          <div className="formBlock">
          {
            formData.showLabel?
              <div className="label_inputs">{formData.config.label}</div>
            : null
          }
            <select
              value={formData.value}
              onBlur={(event) => change({ event, id, blur: true })}
              onChange={(event) => change({ event, id })}
            >
              <option value="">Select One</option>
              {
                formData.config.options.map((i)=>(
                  <option value={i.key} key={i.key}>{i.value}</option>
                ))
              }
            </select>
            {showError()}
          </div>
        )
        break;
      case ('textarea'):
        formTemplate = (
          <div className="formBlock">
          {
            formData.showLabel?
              <div className="label_inputs">{formData.config.label}</div>
            : null
          }
            <textarea
              {...formData.config}
              value={formData.value}
              onBlur={(event) => change({ event, id, blur: true })}
              onChange={(event) => change({ event, id })}
            ></textarea>
            {showError()}
          </div>
        )
        break;
      default:
        formTemplate = null;
    }

    return formTemplate;
  }


  return (
    <div>
      {renderTemplate()}
    </div>
  );
};

export default Formfield;