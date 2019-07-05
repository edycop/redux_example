import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";

class CoursesPage extends React.Component {
  // constructor(props) {
  // super(props);
  state = {
    course: {
      title: ""
    }
  };

  // bound once
  // this.handleChange = this.handleChange.bind(this);
  // }

  handleChange = event => {
    const course = { ...this.state.course, title: event.target.value };
    this.setState({ course });
  };

  handleSubmit = event => {
    event.preventDefault();
    // debugger;
    // this.props.dispatch(courseActions.createCourse(this.state.course));
    this.props.createCourse(courseActions.createCourse(this.state.course));
    // alert(this.state.course.title);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Courses</h2>
        <h3>Add Course</h3>
        <input
          type="text"
          // onChange={this.handleChange.bind(this)}
          onChange={this.handleChange}
          value={this.state.course.title}
        />
        <input type="submit" value="Save" />
        {this.props.courses.map(course => (
          <div key={course.title}>{course.title}</div>
        ))}
      </form>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  createCourse: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  // debugger;
  return {
    courses: state.courses
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // manual dispatch
    // createCourse: course => dispatch(courseActions.createCourse(course))

    // using bindAction
    createCourse: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps // dispatched automatically
)(CoursesPage);
