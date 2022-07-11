process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import axios from 'axios';
import  * as fs from "fs";
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

    const api = axios;

    timeClock.forEach(async (item) => {

      const ips = item.ip

      const urlLogin = `https://${ips}/login.fcgi`
      console.log(urlLogin)
    
      const login = await api.post(urlLogin, {
        login: "admin",
        password: "admin"
      })

      const { session } = login.data

      console.log(session)

      const urlAFD = `https://${ips}/get_afd.fcgi`

      const afd = await api.post(urlAFD, {
        session: session,
        initial_date: {
           day: 11,
           month: 7,
           year: 2022
        }
      })
      
      console.log("AFD ------->", afd.data)

    })

  





    //Verificar se o arquivo 5042.txt ja foi criado caso não criar o arquivo
    fs.writeFile("5042.txt", '', (err) => {
      if (err) throw err;
      console.log("Arquivo criado")
    })

    const res = 'ok'

    // criar adição de conteudo no arquivo 5042.txt para cada relógio ponto cadastrado
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
