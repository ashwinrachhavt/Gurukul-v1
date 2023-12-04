
// type Authors = {
//   id: number,
//   author: string,
// };

// type Categories = {
//   id: number,
//   category: string,
// };


type Submissions = {
  id: number,
  userid: string,
  languageId: number,
  sourceCode: string,
  stdin: string,
  outputStatus: any,
  outputMemory: number,
  outputTime: string,
}

// type Course = {
//   course: string,
//   author: string,
//   category: string,
// }


// // export type CoursesTable = MySqlTableWithColumns<{
// //   id: number;
// //   course: string;
// //   authorId: number;
// //   categoryId: number;
// // }>;

type Course = {
  course: string,
  author: string,
  category: string,
}