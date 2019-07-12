import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadCourses, saveCourse } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

// import { bindActionCreators } from "redux";

// class ManageCoursePage extends React.Component {
//   componentDidMount() {
//     const { courses, authors, loadAuthors, loadCourses } = this.props;

//     // not reloading data courses in eeeach call (more effitient)
//     if (courses.length === 0) {
//       loadCourses().catch(error => {
//         alert("Loading courses failed " + error);
//       });
//     }

//     // not reloading data authors in each call
//     if (authors.length === 0) {
//       // this action is on mapDispatchToProps
//       loadAuthors().catch(error => {
//         alert("Loading authors failed " + error);
//       });
//     }
//   }

//   render() {
//     return (
//       <>
//         <h2>Manage Course</h2>
//       </>
//     );
//   }
// }

// Hooks allow usto handle stateand site effects
// (think lifecycle methods)in functions components
// UPDATE: we export our unconnected component
export function ManageCoursePage({
  courses,
  authors,
  loadAuthors,
  loadCourses,
  saveCourse,
  history,
  ...props
}) {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // not reloading data courses in eeeach call (more effitient)
    if (courses.length === 0) {
      loadCourses().catch(error => {
        alert("Loading courses failed " + error);
      });
    } else {
      setCourse({ ...props.course });
    }

    // not reloading data authors in each call
    if (authors.length === 0) {
      // this action is on mapDispatchToProps
      loadAuthors().catch(error => {
        alert("Loading authors failed " + error);
      });
    }
  }, [props.course]);

  function handleChange(event) {
    const { name, value } = event.target;
    setCourse(prevCourse => ({
      ...prevCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value
    }));
  }

  // client-side validation so users get validation feedback immediately
  function formIsValid() {
    const { title, authorId, category } = course;
    const errors = {};

    if (!title) errors.title = "Title is required.";
    if (!authorId) errors.author = "Author is required.";
    if (!category) errors.category = "Category is required.";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveCourse(course)
      .then(() => {
        toast.success("Course saved.");
        history.push("/courses"); // using React Redirect's history
      })
      .catch(error => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  return authors.length === 0 || courses.length === 0 ? (
    <Spinner />
  ) : (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}

// PropType functions
ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

// Redux selector: selects data from the Redux Store
// https://redux.js.org/recipes/computing-derived-data
export function getCourseBySlug(courses, slug) {
  return courses.find(course => course.slug === slug) || null;
}

// Redux mapping functions: mapStateToProps, mapDispatchToProps
function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  // debugger;
  const course =
    slug && state.courses.length > 0
      ? getCourseBySlug(state.courses, slug)
      : newCourse;
  // debugger;
  return {
    // course: course,
    course: course,
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
  loadAuthors, // JavaScript object
  saveCourse
};

// Redux connect component
// UPDATE: export default connected component
export default connect(
  mapStateToProps,
  mapDispatchToProps // dispatched automatically
)(ManageCoursePage);
