import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

class CoursesPage extends React.Component {
  state = {
    redirectToAddCcoursePage: false
  };

  componentDidMount() {
    const { courses, authors, actions } = this.props;

    // not reloading data courses in each call (more efficient)
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

  // handleDeleteCourse = course => {
  //   toast.success("Course deleted.");
  //   this.props.actions.deleteCourse(course).catch(error => {
  //     toast.error("Delete failed. " + error.message, {autoClose: false});
  //   });
  // }

  // async/await JavaScript aproach
  handleDeleteCourse = async course => {
    toast.success("Course deleted.");
    try {
      await this.props.actions.deleteCourse(course);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };

  render() {
    return (
      <>
        {this.state.redirectToAddCcoursePage && <Redirect to="/course" />}
        <h2>Courses</h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-course"
              onClick={() => this.setState({ redirectToAddCcoursePage: true })}
            >
              Add Course
            </button>

            <CourseList
              onDeleteClick={this.handleDeleteCourse}
              courses={this.props.courses}
            />
          </>
        )}
      </>
    );
  }
}

CoursesPage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  // debugger;
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map(course => {
            return {
              ...course,
              authorName: state.authors.find(a => a.id === course.authorId).name
            };
          }),
    authors: state.authors,
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // manual dispatch
    // createCourse: course => dispatch(courseActions.createCourse(course))

    // using bindAction
    // createCourse: bindActionCreators(courseActions, dispatch)
    actions: {
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps // dispatched automatically
)(CoursesPage);
