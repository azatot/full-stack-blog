import s from './App.module.scss';
import HeaderContainer from '../components/Header/HeaderContainer'
import FooterContainer from '../components/Footer/FooterContainer'
// import MainRoutesContainer from "../components/Main/MainRoutesContainer";
import {initializeApp, authenticateTC} from "../store/reducers/common-app-reducer";
import {connect} from "react-redux";
import Preloader from "../components/common/Preloader";
import Newest from "../components/Newest/Newest";
import {useEffect} from "react";


const App = (props) => {
  const {
    initializeApp,
    initialized,
    authenticateTC,
    // isFetching
  } = props;

  useEffect(() => {
    initializeApp();
  }, [initializeApp, authenticateTC]);

  if (!initialized) return <Preloader/>;
  else return (
      <div className={s.wrapper}>
        {/*<HeaderContainer/>*/}
        <Newest/>
        {/*<MainRoutesContainer/>*/}
        {/*<FooterContainer/>*/}
      </div>
  );
};

const mapStateToProps = (state) => {
  return {
    initialized: state.common.initialized,
    isFetching: state.common.isFetching,
    isAuthenticated: state.common.isAuthenticated
  }
};

export default connect(mapStateToProps, {initializeApp, authenticateTC})(App);
