import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export default function AssignmentsDao() {  // remove db param

  async function createAssignment(assignment) {
    return model.create({ ...assignment, _id: uuidv4() });
  }

  async function findAssignmentsForCourse(courseId) {
    return model.find({ course: courseId });
  }

  async function deleteAssignment(assignmentId) {
    return model.deleteOne({ _id: assignmentId });
  }

  async function updateAssignment(assignmentId, assignmentUpdates) {
    return model.updateOne({ _id: assignmentId }, { $set: assignmentUpdates });
  }

  async function findAssignmentById(assignmentId) {
    return model.findById(assignmentId);
  }

  return {
    findAssignmentsForCourse,
    createAssignment,
    deleteAssignment,
    updateAssignment,
    findAssignmentById,
  };
}