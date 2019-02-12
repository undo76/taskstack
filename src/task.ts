export default interface Task {
  id: number;
  title: string;
  description?: string;
  tasks?: Task[];
}

export const myTasks: Task[] = [
  // {
  //   title: "Crear unit tests"
  // },
  // {
  //   title: "Escribir documentacion",
  //   description: "Solo los idiomas oficiales",
  //   tasks: [
  //     {
  //       title: "Traducir al Ingles"
  //     },
  //     {
  //       title: "Traducir al Frances",
  //     },
  //     {
  //       title: "Traducir al Italiano",
  //       description: "capicci??"
  //     }
  //   ]
  // },
  // {
  //   title: "Actualizar CV"
  // }
];
