import SignUp from '../components/signup';
import Footer from '../components/footer';

const SignUpContainer = () => {
  const mainDivStyle = {
    minHeight: '100%',
    minWidth: '100%',
  };
  return (
    <div style={mainDivStyle}>
      <SignUp></SignUp>
      {/* <Footer /> */}
    </div>
  );
};

export default SignUpContainer;
