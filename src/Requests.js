import { firestore } from "./fireBase";
import {
  collection,
  arrayUnion,
  updateDoc,
  getDocs,
  doc,
  addDoc,
} from "firebase/firestore";

export async function getCollection(collectionName) {
  const querySnapshot = await getDocs(collection(firestore, collectionName));

  return querySnapshot.docs.map((doc) => doc.data());
}

/**
 *
 * @param {string} start
 * @param {string} end
 * @param {string} tutor
 * @param {string} type
 * @param {boolean} isPrivate
 * @returns
 */
export function setDocument(start, end, tutor, type, isPrivate) {
  return addDoc(collection(firestore, "Lessons"), {
    start,
    end,
    tutor,
    type,
    isPrivate,
  });
}

/**
 * insert the name into the DB so we can count the number of the students
 */
export function setStudent(name) {
  const list = doc(firestore, "Students", "studentsList");

  return updateDoc(list, {
    names: arrayUnion(name.toLowerCase()),
  });
}
