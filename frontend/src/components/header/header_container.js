import { connect } from "react-redux";
import { logout } from "../../actions/session_actions";
import Header from "./header";
import { openModal } from "../../actions/modal_actions";


const mapStateToProps = state => ({
    loggedIn: state.session.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
    openModal: modal => dispatch(openModal(modal)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);