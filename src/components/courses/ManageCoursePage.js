import React from "react";
import { connect } from "react-redux";
import { loadCourses } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
// import { bindActionCreators } from "redux";

class ManageCoursePage extends React.Component {
  componentDidMount() {
    const { courses, authors, loadAuthors, loadCourses } = this.props;

    // not reloading data courses in eeeach call (more effitient)
    if (courses.length === 0) {
      loadCourses().catch(error => {
        alert("Loading courses failed " + error);
      });
    }

    // not reloading data authors in each call
    if (authors.length === 0) {
      // this action is on mapDispatchToProps
      loadAuthors().catch(error => {
        alert("Loading authors failed " + error);
      });
    }
  }

  render() {
    return (
      <>
        <h2>Manage Course</h2>
      </>
    );
  }
}
// PropType functions
ManageCoursePage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired
};

// Redux mapping functions: mapStateToProps, mapDispatchToProps
function mapStateToProps(state) {
  // debugger;
  return {
    courses: state.courses,
    authors: state.authors
  };
}

// function mapDispatchToProps(dispatch) {
//   return {
//     // manual dispatch
//     // createCourse: course => dispatch(courseActions.createCourse(course))

//     // using bindAction
//     // createCourse: bindActionCreators(courseActions, dispatch)
//     actions: {
//       loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
//       loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch)
//     }
//   };
// }

const mapDispatchToProps = {
  // loadCourses: loadCourses, // JavaScript function
  // loadAuthors: loadAuthors // JavaScript function
  loadCourses, // JavaScript object
  loadAuthors // JavaScript object
};

// Redux connect component
export default connect(
  mapStateToProps,
  mapDispatchToProps // dispatched automatically
)(ManageCoursePage);
