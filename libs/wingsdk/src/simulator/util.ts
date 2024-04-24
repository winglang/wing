// import { access, constants } from "node:fs";
// import { promisify } from "node:util";

// /**
//  * Check if a file exists for an specific path
//  * @param filePath
//  * @Returns Return `true` if the file exists, `false` otherwise.
//  */
// export async function exists(filePath: string): Promise<boolean> {
//   try {
//     await promisify(access)(filePath, constants.F_OK);
//     return true;
//   } catch (er) {
//     return false;
//   }
// }

// /**
//  * Check if a file exists and if we have read and write permissions to it
//  * @param filePath
//  * @Returns Return `true` if the file exists, `false` otherwise.
//  */
// export async function existsReadWrite(filePath: string): Promise<boolean> {
//   try {
//     await promisify(access)(
//       filePath,
//       constants.F_OK | constants.R_OK | constants.W_OK //eslint-disable-line no-bitwise
//     );
//     return true;
//   } catch (er) {
//     return false;
//   }
// }
