const http = require("http");
const fsPromises = require("fs/promises");

let contador = 0;
const server = http.createServer(async (req, res) => {
  // '/' seria la raiz de la pagina
  if (req.url === "/") {
    res.write("hola, este es nuestro primer servidor en node con http");
    res.end();
  }
  if (req.url === "/leer") {
    try {
      const textData = await fsPromises.readFile("./text.txt", "utf-8");
      res.write(`El contenido del archivo es: ${textData}`);
      res.end();
    } catch (error) {
      res.write("Algo paso, ocurrio un error :( ): ", error);
      res.end();
    }
  }
  if (req.url === "/escribir") {
    try {
      contador = contador + 1;
      await fsPromises.writeFile(
        "./escribiendo.txt",
        `Escribiste el archivo ${contador} veces. ;)`
      );
      res.write("Escribiste! Visita tu archivo para ver los cambios :B.");
      res.end();
    } catch (error) {
      console.log(error);
      res.end();
    }
  }
  if (req.url === "/agregar") {
    try {
      await fsPromises.appendFile("escribiendo.txt", "Agregando conteniduki ");
      res.write("Contenido agregado");
      res.end();
    } catch (error) {
      console.log(error);
    }
  }
  if (req.url === "/borrar-text") {
    try {
      await fsPromises.unlink("./text.txt");
      res.write("Borraste text.txt");
      res.end;
    } catch (error) {
      console.log(error);
    }
  }
  if (req.url === "/borrar-escribiendo") {
    try {
      await fsPromises.unlink("./escribiendo.txt");
      res.write("Borraste escribiendo.txt");
      res.end;
    } catch (error) {
      console.log(error);
    }
  }
});

server.listen(8080);

console.log("server listening in port 8080");
