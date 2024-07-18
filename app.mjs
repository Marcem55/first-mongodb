import mongoose from "mongoose";

mongoose
  .connect("mongodb://127.0.0.1:27017/demo")
  .then(() => console.log("Conected to MongoDB"))
  .catch((err) => console.log("Cannot conect to MongoDB...", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  published: Boolean,
  price: Number,
});

const Course = mongoose.model("Course", courseSchema);

const createCourse = async () => {
  const course = new Course({
    name: "React para principiantes",
    author: "Emilio",
    tags: ["web development", "frontend", "react"],
    published: true,
    price: 15,
  });
  const course2 = new Course({
    name: "NodeJS desde 0",
    author: "Juampy",
    tags: ["web development", "backend", "javascript"],
    published: true,
    price: 20,
  });
  const course3 = new Course({
    name: "Crea una landing dinámica con HTML, CSS y JavaScript",
    author: "Marcelo",
    tags: ["web development", "frontend", "javascript", "design"],
    published: true,
    price: 10,
  });
  const course4 = new Course({
    name: "Usa Excel como un profesional",
    author: "Julieta",
    tags: ["sheets", "office", "data"],
    published: true,
    price: 25,
  });
  const course5 = new Course({
    name: "Python para analizar datos",
    author: "Franco",
    tags: ["data", "analytics", "python"],
    published: true,
    price: 30,
  });
  const course6 = new Course({
    name: "Ruby on rails desde 0",
    author: "Cristian",
    tags: ["ruby", "programming"],
    published: false,
    price: 5,
  });
  const course7 = new Course({
    name: "Desarrolla en .NET ya!",
    author: "Cristian",
    tags: [".NET", "programming", "fullstack"],
    published: false,
    price: 50,
  });
  const course8 = new Course({
    name: "Aprende a trabajar con CSS como un PRO!",
    author: "Franco",
    tags: ["css", "styles", "design"],
    published: true,
    price: 45,
  });
  const course9 = new Course({
    name: "R, la base de todo",
    author: "Juampy",
    tags: ["R", "programming"],
    published: true,
    price: 28,
  });
  const course10 = new Course({
    name: "Angular, el framework de tu vida",
    author: "Julieta",
    tags: ["angular", "programming", "fronted"],
    published: true,
    price: 5,
  });

  const courseResult = await course6.save();
  const courseResult2 = await course7.save();
  const courseResult3 = await course8.save();
  const courseResult4 = await course9.save();
  const courseResult5 = await course10.save();
  console.log(courseResult);
  console.log(courseResult2);
  console.log(courseResult3);
  console.log(courseResult4);
  console.log(courseResult5);
};

// createCourse();

const getCourses = async () => {
  //! Métodos de búsqueda
  //* find() devuelve todos los documentos del modelo especificado
  //* dentro del find, podemos buscar especificamente documentos donde, en este caso, la propiedad published === true. Podríamos buscar en base a cualquier propiedad que queramos
  //* limit() lo utilizamos para limitar justamente la cantidad de registros que nos devuelve
  //* sort() es para ordenar ascendente (1) o descendentemente(-1) los resultados obtenidos en base a la propiedad que elijamos (en este caso author)
  //* select() nos permite seleccionar ciertas propiedades del modelo consultado
  const courses = await Course.find({ published: true })
    .limit(10)
    .sort({ author: -1 })
    .select({
      name: 1,
      tags: 1,
    });
  //   console.log("courses1", courses);

  //! Operadores de comparación
  //* eq (equal)
  //* ne (not equal)
  //* gt (greather than)
  //* gte (greather than or equal to)
  //* lt (less than)
  //* lte (less than or equal to)
  //* in
  //* nin
  const courses2 = await Course
    // .find({ price: { $gte: 20, $lte: 30 } })
    // .find({ price: { $in: [10, 15, 30] } })
    // .find({ price: { $ne: 20 } })
    .find({ price: { $lt: 20 } });
  //   console.log("courses2", courses2);

  //! Operadores lógicos
  //* or()
  //* and()
  const courses3 = await Course.find()
    //   .or([
    //     {
    //       author: "Julieta",
    //     },
    //     {
    //       author: "Franco",
    //     },
    //   ]);
    .and([
      {
        author: "Marcelo",
      },
      { published: true },
    ]);
  //   console.log("courses3", courses3);

  //! Expresiones regulares
  //* Empiece con la palabra Mar /^Mar/
  //   const courses4 = await Course.find({ author: /^Ju/ });
  //* Termine con la palabra celo /celo$/
  //   const courses4 = await Course.find({ author: /celo$/ });
  //* Contenido específico en algún campo /.*ar.*/
  const courses4 = await Course.find({ name: /.*ana.*/ });
  //   console.log("courses4", courses4);

  //? Paginación
  //* skip()
  const page = 2;
  const limit = 5;
  const courses5 = await Course.find()
    .limit(limit)
    .skip((page - 1) * limit);

  const count = await Course.countDocuments();
  console.log("courses5", {
    courses5,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
    resultsInThisPage: courses5.length,
  });
};

getCourses();
