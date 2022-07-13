process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import axios from 'axios';
import  * as fs from "fs";
import * as tcpp from 'tcp-ping';
import { TimeClock } from 'src/time-clock/entities/time-clock.entity';
import { CreatePointRegisterDto } from './dto/create-point-register.dto';
import { UpdatePointRegisterDto } from './dto/update-point-register.dto';


@Injectable()
export class PointRegisterService {
  constructor(
    @InjectModel(TimeClock)
    private timeClokModel: typeof TimeClock
    ) {}
    

  create(createPointRegisterDto: CreatePointRegisterDto) {
    return 'This action adds a new pointRegister';
  }

   async findAll() {
    const timeClock = await this.timeClokModel.findAll()
    
    fs.access('/home/william/www/clp-ponto/temp/afd/5042.txt', fs.constants.F_OK, (err) => {

      fs.unlink('/home/william/www/clp-ponto/temp/afd/5042.txt', (err) => {
        if (err) {
          console.log("Erro ao deletar arquivo 5042.txt : ", err)
        }

        console.log("Arquivo 5042.txt deletado")
      })
      if (err) {
        fs.writeFile("5042.txt", '', (err) => {
          if (err) {
            console.log("Erro ao criar arquivo 5042.txt : ", err)
          }
        })
      } else {
        console.log('o Arquivo 5042.txt ja existe!')
      }

    })

    const api = axios;

    timeClock.forEach(async (item) => {

      const ips = item.ip
      const urlLogin = `https://${ips}/login.fcgi`

      //testar se o ip esta acessivel caso não esteja passar para o proximo da lista

      tcpp.probe(ips, 80, async (err, available) => {

        if(available === true){
          console.log(`o ip: ${ips} esta acssivel`)
          const login = await api.post(urlLogin, {
            login: "admin",
            password: "admin"
          })
    
          const { session } = login.data
    
          const urlAFD = `https://${ips}/get_afd.fcgi`
    
          const afd = await api.post(urlAFD, {
            session: session,
            initial_date: {
               day: 11,
               month: 7,
               year: 2022
            }
          })
          
          const content = afd.data
    
          const maxLength = content.length
          
          const contentAfd = content.substr(0, maxLength - 26)
              
          fs.appendFile('/home/william/www/clp-ponto/temp/afd/5042.txt', contentAfd, (err) => {
            if (err) {
              console.log("Erro ao adicionar conteudo para o arquivo 5042.txt");
            }
    
            console.log("conteudo adicionado")
          })
        }
      })

    
      
          

    })

    const res = 'ok'

    return res

  }

  findOne(id: number) {
    return `This action returns a #${id} pointRegister`;
  }

  update(id: number, updatePointRegisterDto: UpdatePointRegisterDto) {
    return `This action updates a #${id} pointRegister`;
  }

  remove(id: number) {
    return `This action removes a #${id} pointRegister`;
  }
}
