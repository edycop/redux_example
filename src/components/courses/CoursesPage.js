import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";

class CoursesPage extends React.Component {
  componentDidMount() {
    const { courses, authors, actions } = this.props;

    // not reloading data courses in each call (more effitient)
    if (courses.length === 0) {
      actions.loadCourses().catch(error => {
        alert("Loading courses failed " + error);
      });
    }

    // not reloading data authors in each call
    if (authors.length === 0) {
      // this action is on mapDispatchToProps
      actions.loadAuthors().catch(error => {
        alert("Loading authors failed " + error);
      });
    }
  }

  render() {
    return (
      <>
        <h2>Courses</h2>
        <CourseList courses={this.props.courses} />
      </>
    );
  }
}

CoursesPage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  // debugger;
  return {
    courses:
      state.courses.length === 0
        ? []
        : state.courses.map(course => {
            return {
              ...course
              // authorName: state.authors.find(a => a.id === course.authorId).name
              // authorName: state.authors.find(a => a.id === course.authorId).name
              // authorName: state.authors.find(associateNames(course))
              // authorName: state.authors.find(function(element, course) {
              //   if (course.authorId === element.id) {
              //     return element.name;
              //   } else {
              //     return "test";
              //   }
              // })
            };
          }),
    authors: state.authors
  };
}

// function associateNames(author, course) {
//   if (course.authorId === author.id) {
//     return author.name;
//   }
//   return "";
// }

function mapDispatchToProps(dispatch) {
  return {
    // manual dispatch
    // createCourse: course => dispatch(courseActions.createCourse(course))

    // using bindAction
    // createCourse: bindActionCreators(courseActions, dispatch)
    actions: {
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps // dispatched automatically
)(CoursesPage);
