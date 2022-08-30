import React from "react";
/**
 * @type {React.Context<{
 * tutors: any[],
 * lessonsTypes: any[],
 * lessons: any[],
 * studentsNumber: any[],
 * update(): void
 * } | undefined>}
 */

/**
 * here we are creating the context
 * createContext help us to manage and update the information in all the program, like global variable
 * evrey compopnt use this information will update everyone who use this information in the changes
 */
export const firebaseData = React.createContext();

/**
 *
 *  connecting firebase to useContenxt
 */
export function useFirebaseData() {
  return React.useContext(firebaseData);
}
