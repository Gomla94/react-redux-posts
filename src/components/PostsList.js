import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchPostsAndUsers } from "../actions";
import UserHeader from "./UserHeader";

// class PostsList extends React.Component {
//   componentDidMount() {
//     this.props.fetchPosts();
//   }

//   render() {
//     return <div>Posts List</div>;
//   }
// }

const PostsList = ({ posts, fetchPostsAndUsers }) => {
  console.log(posts);
  const renderPosts = posts.map((post) => {
    return (
      <div className="item" key={post.id}>
        <i className=" aligned user icon large middle "></i>
        <div className="content">
          <div className="description">
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
          <UserHeader userId={post.userId} />
        </div>
      </div>
    );
  });
  useEffect(() => {
    fetchPostsAndUsers();
  }, []);
  return <div className="ui relaxed divided list">{renderPosts}</div>;
};

const mapStateToProps = (state) => {
  return { posts: state.posts };
};

export default connect(mapStateToProps, { fetchPostsAndUsers })(PostsList);

//here we see 2 console.logs, the first one will print posts as an empty array, and the second one will be
//the response of the api, because when the app boots up for the first time all reducers get invoked
//and we dispatch an action with a random initialized type and the returns a state object with an empty array,
//then because we use useEffectHook or compnentDidMount and inside it we run the fetchPosts function which
//calls the external api, and then the fetch posts reducers gets invoked again and we get a new state object
//with the response and redux sees that we have a new data inside the state object and it tells react to
//rerender the component.
