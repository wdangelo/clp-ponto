process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import axios from 'axios';
import * as tcpp from 'tcp-ping';
import { TimeClock } from 'src/time-clock/entities/time-clock.entity';
import { CreatePointRegisterDto } from './dto/create-point-register.dto';
import { UpdatePointRegisterDto } from './dto/update-point-register.dto';
import { File } from 'src/utils/file';
import { SftpConnect } from 'src/utils/sftp';

const file = new File();
const sftpConnect = new SftpConnect();
@Injectable()
export class PointRegisterService {
  
  constructor(
    @InjectModel(TimeClock)
    private timeClokModel: typeof TimeClock,
    ) {}
    

  create(createPointRegisterDto: CreatePointRegisterDto) {
    return 'This action adds a new pointRegister';
  }

   async findAll() {

    const api = axios;

    const timeClock = await this.timeClokModel.findAll()

    file.delete('/home/william/www/clp-ponto/temp/afd/', '5042.txt')

    file.create('/home/william/www/clp-ponto/temp/afd/', '5042.txt')

    timeClock.forEach(async (item) => {

      const ips = item.ip
      const urlLogin = `https://${ips}/login.fcgi`
      console.log(ips)

      
      tcpp.probe(ips, 80, async (err, available) => {
        if(available === true){

          console.log(`o ip: ${ips} esta acessivel`)
          
          const login = await api.post(urlLogin, {
            login: "admin",
            password: "admin"
          })
    
          const { session } = login.data
    
          const urlAFD = `https://${ips}/get_afd.fcgi`
    
          const afd = await api.post(urlAFD, {
            session: session,
            initial_date: {
               day: 14,
               month: 7,
               year: 2022
            }
          })
          
          const content = afd.data
    
          const maxLength = content.length
          
          const contentAfd = content.substr(0, maxLength - 26)

          file.append('/home/william/www/clp-ponto/temp/afd/', '5042.txt', contentAfd)
              
        }else {
          console.log(`O ip ${ips} n??o esta acessivel`)
        }
      })   

    })

    
    sftpConnect.sftpPut()
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
