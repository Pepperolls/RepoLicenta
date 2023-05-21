import Login from '../components/login';
import Footer from '../components/footer';

const LogInContainer = () => {
  const mainDivStyle = {
    minHeight: '100%',
    minWidth: '100%',
  };
  return (
    <div style={mainDivStyle}>
      <Login></Login>
      {/* <Footer></Footer> */}
    </div>
  );
};

export default LogInContainer;
