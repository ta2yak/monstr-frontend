var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var MonstrApp = require('./components/MonstrApp.react.jsx');
var WelcomePage = require('./components/session/WelcomePage.react.jsx');
var LoginPage = require('./components/session/LoginPage.react.jsx');
var SignupPage = require('./components/session/SignupPage.react.jsx');

var PostNewPage = require('./components/post/NewPage.react.jsx');
var PostEditPage = require('./components/post/EditPage.react.jsx');
var PostsPage = require('./components/post/IndexPage.react.jsx');

var UserEditPage = require('./components/user/EditPage.react.jsx');

module.exports = (
  <Route name="app" path="/" handler={MonstrApp}>
    <DefaultRoute handler={WelcomePage} />
    <Route name="welcome" path="/welcome" handler={WelcomePage}/>
    <Route name="login" path="/login" handler={LoginPage}/>
    <Route name="signup" path="/signup" handler={SignupPage}/>
    <Route name="new-post" path="/post/new" handler={PostNewPage}/>
    <Route name="edit-post" path="/post/edit" handler={PostEditPage}/>
    <Route name="posts" path="/posts" handler={PostsPage}/>
    <Route name="edit-user" path="/user/edit" handler={UserEditPage}/>
</Route>
);
