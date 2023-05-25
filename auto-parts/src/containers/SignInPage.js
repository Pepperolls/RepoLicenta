import SignInForm from '../components/SignInForm';

const SignInPage = () => {
  const mainDivStyle = {
    minHeight: '100%',
    minWidth: '100%',
  };
  return (
    <div style={mainDivStyle}>
      <SignInForm></SignInForm>
    </div>
  );
};

export default SignInPage;
