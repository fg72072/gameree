import Fade from "react-reveal/Fade";
const NewSignIn = () => {
  return (
    <>
      <div className={`col-md-2 mb-3`}>
        <label>{"Email"}</label>
        <input
          type="text"
          className={className}
          data-id={id}
          placeholder={"Email"}
          value={value}
          onChange={this.handleChange}
        />
        {/* The next line is where you specify that the
            error message should be shown only
            when the 'invalid' variable is true    */}
        <Fade bottom when={invalid}>
          <div
            className="invalid-feedback"
            //Boostrap 4 uses some CSS tricks to simplify
            //error handling but we're doing it differently
            //so the next line disables these tricks
            style={{ display: "block" }}
          >
            Oh no, the number of characters is odd
          </div>
        </Fade>
      </div>
    </>
  );
};
export default NewSignIn;
