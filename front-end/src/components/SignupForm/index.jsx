import styles from "./SignupForm.module.css";

const SignupForm = ({ onSubmit, children, className }) => {
  return (
    <section>
      <form
        onSubmit={onSubmit}
        className={`${styles.formContainer} ${className || ""}`}
      >
        {children}
      </form>
    </section>
  );
};

export default SignupForm;
