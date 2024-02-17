// import React from 'react'

function InputForm() {
  return (
    <form id="inputs-form">
      <div className="name-input-container">
        <div className="name-input">
          <label htmlFor="">cardholder name</label>
          <input type="text" placeholder="e.g Jane Appleseed" />
          <div className="error-message">
            <span>Can't be blank</span>
          </div>
        </div>
      </div>

      <div className="number-input-container">
        <div className="number-input">
          <label htmlFor="">cardholder name</label>
          <input type="text" placeholder="e.g Jane Appleseed" />
          <div className="error-message">
            <span>Can't be blank</span>
          </div>
        </div>
      </div>

      <div className="detail-inputs-container">
        <div className="date-input-container">
          <label htmlFor="">exp. date(mm/yy)</label>
          <div className="date-inputs">
            <input type="text" placeholder="MM" />
            <input type="text" placeholder="YY" />
          </div>
          <div className="error-message">
            <span>Can't be blank</span>
          </div>
        </div>
        <div className="cvc-input container">
          <div className="cvc-input">
            <label htmlFor="">cvc</label>
            <input type="text" placeholder="e.g 123" />
          </div>
          <div className="error-message">
            <span>Can't be blank</span>
          </div>
        </div>
      </div>
      <button disabled className="defaultbtn" type="submit">
        Confirm
      </button>
    </form>
  );
}

export default InputForm;
