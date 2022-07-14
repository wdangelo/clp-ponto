import  * as fs from "fs";
export class File {

async delete(filepath: string, filename: string) {

    fs.unlink(filepath + filename, (error) => {
      if (error) {
        console.log("Erro ao deletar arquivo 5042.txt : ", error)
      }
  
      console.log("Arquivo 5042.txt deletado")
    })

}


async create(filepath: string,  filename: string) {

  fs.access(filepath + filename, fs.constants.F_OK, (err) => {

    if (err) {
      fs.writeFile(filepath + filename, '', (err) => {
        if (err) {
          console.log("Erro ao criar arquivo 5042.txt : ", err)
        }
      })
    } 
  })
}

  async append(filepath: string,  filename: string, data: string) {

    fs.appendFile(filepath + filename, data, (err) => {
      if (err) {
        console.log("Erro ao adicionar conteudo para o arquivo 5042.txt");
      }
    })

  }

}
