import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addComment, deleteComment, sortComments, fetchComments } from '../actions';

class App extends Component {

  componentDidMount() {
    this.fetchComments();
  }

  fetchComments() {
      const url = "https://jsonplaceholder.typicode.com/comments";
      let comments = [];

      fetch(url, {
        method: 'GET'
      })
        .then(response => response.json())
        .then(json => {
          comments = json
          this.props.fetchComments(comments);
        });
    }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault();

    let name = this.state.name.trim(),
        email = this.state.email.trim(),
        body = this.state.body.trim();

    if(!name || !email || !body) {
      return;
    }
    this.props.addComment(this.state);
    this.clearAddCommentFormFields();
  }

  clearAddCommentFormFields() {
        document.getElementById("add-comment-form").reset();
  }

  handleSearch(e) {
    e.preventDefault();

    const { comments } = this.props;
    return this.filterComments(comments);
  }

  filterComments(comments) {

    if(this.state && this.state.phrase) {
      const phrase = this.state.phrase.trim();

      return comments.filter(comment => {

        if(comment.id === phrase) {
          return 1;

        } else if(comment.name.indexOf(phrase) !== -1) {
          return 1;

        } else if(comment.email.indexOf(phrase) !== -1) {
          return 1;

        } else if(comment.body.indexOf(phrase) !== -1) {
          return 1;
        }

        return 0;
      });
    }

    return comments;
  }

  deleteComment(id) {
    this.props.deleteComment(id);
  }

  sortComments(field, order) {
    this.props.sortComments(field, order);
  }

  renderComments() {
    let { comments } = this.props;
    comments = this.filterComments(comments);

    return (
      <div>
        <div className="pull-right"><span className="label label-default">Found {comments.length} comments</span></div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Name &nbsp;
                  <a href='#'><i className="fa fa-arrow-up" aria-hidden="true" onClick={ this.sortComments.bind(this, 'name', 'asc') }></i></a>
                  <a href='#'><i className="fa fa-arrow-down" aria-hidden="true" onClick={ this.sortComments.bind(this, 'name', 'desc') }></i></a>
              </th>
              <th>Email &nbsp;
                <a href='#'><i className="fa fa-arrow-up" aria-hidden="true" onClick={ this.sortComments.bind(this, 'email', 'asc') }></i></a>
                <a href='#'><i className="fa fa-arrow-down" aria-hidden="true" onClick={ this.sortComments.bind(this, 'email', 'desc') }></i></a>
              </th>
              <th>Comment &nbsp;
                <a href='#'><i className="fa fa-arrow-up" aria-hidden="true" onClick={ this.sortComments.bind(this, 'body', 'asc') }></i></a>
                <a href='#'><i className="fa fa-arrow-down" aria-hidden="true" onClick={ this.sortComments.bind(this, 'body', 'desc') }></i></a>
              </th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            { comments.map(comment => {
                return (
                  <tr key={comment.id}>
                    <td>{comment.name}</td>
                    <td>{comment.email}</td>
                    <td>{comment.body}</td>
                    <td><button className="btn btn-danger btn-xs">
                          <i className="fa fa-times" aria-hidden="true" onClick={ this.deleteComment.bind(this, comment.id) }></i>
                        </button>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
    )
  }

  render () {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              <h3>Comments </h3>
            </div>
            <div className="col-sm-8">
              <div className="form-inline pull-right">
                <div className="form-group">
                  <form onSubmit={this.handleSearch.bind(this)}>

                    <input
                      type="text"
                      name="phrase"
                      className="form-control"
                      placeholder="Search..."
                      onChange={this.onChange.bind(this)}/>

                    <button
                      type="submit"
                      className="btn btn-primary"><i className="fa fa-search" aria-hidden="true"></i> Search</button>

                  </form>
                </div>
              </div>
            </div>
          </div>


          <div className="form-inline">
            <div className="form-group">
              <form id="add-comment-form" onSubmit={this.handleSubmit.bind(this)}>

                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Your name..."
                  onChange={this.onChange.bind(this)}/>

                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Your Email..."
                  onChange={this.onChange.bind(this)}/>

                <input
                  type="text"
                  name="body"
                  className="form-control"
                  placeholder="Comment..."
                  onChange={this.onChange.bind(this)}/>

                <button
                  type="submit"
                  className="btn btn-success"><i className="fa fa-plus" aria-hidden="true"></i> Add Comment</button>

              </form>
            </div>
          </div>

          { this.renderComments() }

        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    comments: state
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({addComment, deleteComment, sortComments, fetchComments}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
