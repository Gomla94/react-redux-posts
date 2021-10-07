import React from "react";
import { connect } from "react-redux";

const UserHeader = ({ user }) => {
  // useEffect(() => {
  //   fetchUser(userId);
  // }, []);

  if (!user) {
    return null;
  }
  return <div>{user.name}</div>;
};

const mapStateToProps = (state, ownProps) => {
  //ownProps argument is a reference to all the props that are being passed to the component.
  return {
    user: state.users.find((user) => user.id === ownProps.userId),
  };
};
export default connect(mapStateToProps)(UserHeader);

//REMEBER we need to use mapStateToProps to acces the redux level state.

//mapStateToProps receives a second parameter which is the props of the main component (the UserHeader component)
