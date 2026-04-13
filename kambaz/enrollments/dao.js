import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export async function findCoursesForUser(userId) {
 const enrollments = await model.find({ user: userId }).populate("course");
 return enrollments.map((enrollment) => enrollment.course);
}



export default function EnrollmentsDao() {

async function findUsersForCourse(courseId) {
  const enrollments = await model.find({ course: courseId }).populate("user");
  return enrollments.map((e) => e.user);
  }

  async function findEnrollmentsForUser(userId) {
    return model.find({ user: userId });
  }

  function enrollUserInCourse(userId, courseId) {
   return model.create({
     user: userId,
     course: courseId,
     _id: `${userId}-${courseId}`,
   });

  }

  async function unenrollUserFromCourse(userId, courseId) {
  return model.deleteOne({ user: userId, course: courseId }); 
}

  return {
    findEnrollmentsForUser,
    enrollUserInCourse,
    unenrollUserFromCourse,
    findCoursesForUser,
    findUsersForCourse
  };
}
