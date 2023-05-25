import SignUp from '../components/SignUpForm';

const SignUpPage = () => {
  const mainDivStyle = {
    minHeight: '100%',
    minWidth: '100%',
  };
  return (
    <div style={mainDivStyle}>
      <SignUp></SignUp>
    </div>
  );
};

export default SignUpPage;
