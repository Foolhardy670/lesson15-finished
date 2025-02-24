import useInput from "../hooks/useInput";

const BasicForm = () => {
  const validateNotEmpty = (value) => value.trim() !== "";
  const validateEmail = (value) => value.includes("@");

  const {
    value: firstNameValue,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstName,
  } = useInput(validateNotEmpty);

  const {
    value: lastNameValue,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastName,
  } = useInput(validateNotEmpty);

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(validateEmail);

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    const formIsValid = firstNameIsValid && lastNameIsValid && emailIsValid;

    if (!formIsValid) {
      firstNameBlurHandler();
      lastNameBlurHandler();
      emailBlurHandler();
      return;
    }

    console.log("Submitted:", { firstNameValue, lastNameValue, emailValue });

    resetFirstName();
    resetLastName();
    resetEmail();
  };

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className="control-group">
        <div className={`form-control ${firstNameHasError ? "invalid" : ""}`}>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            value={firstNameValue}
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
          />
          {firstNameHasError && (
            <p className="error-text">First name must not be empty.</p>
          )}
        </div>
        <div className={`form-control ${lastNameHasError ? "invalid" : ""}`}>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            value={lastNameValue}
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
          />
          {lastNameHasError && (
            <p className="error-text">Last name must not be empty.</p>
          )}
        </div>
      </div>
      <div className={`form-control ${emailHasError ? "invalid" : ""}`}>
        <label htmlFor="email">E-Mail Address</label>
        <input
          type="email"
          id="email"
          value={emailValue}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
        {emailHasError && (
          <p className="error-text">Please enter a valid email address.</p>
        )}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
