process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
import * as schedule from 'node-schedule'
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import axios from 'axios';
import * as tcpp from 'tcp-ping';
import { TimeClock } from 'src/time-clock/entities/time-clock.entity';
import { CreatePointRegisterDto } from './dto/create-point-register.dto';
import { UpdatePointRegisterDto } from './dto/update-point-register.dto';
import { File } from 'src/utils/file';
import { SftpConnect } from 'src/utils/sftp';
import * as dayjs from 'dayjs';
import 'dotenv/config'


const file = new File();

const day = dayjs(new Date()).subtract(10, 'days').format('D');
const daynumber: number = +day;
const month = dayjs(new Date()).format('M');
const monthNumber: number = +month;

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

    const rule = new schedule.RecurrenceRule();
    
    rule.hour = 15
    rule.minute = 35

    schedule.scheduleJob(rule, ( ) => {
      console.log('Coletando dados')
      timeClock.forEach(async (item) => {

        const ips = item.ip
        const urlLogin = `https://${ips}/login.fcgi`
        console.log(ips)
  
        //Desacoplar teste de ips
        tcpp.probe(ips, 80, async (err, available) => {
          if(available === true){
  
            console.log(`o ip: ${ips} esta acessivel`)
            
            const login = await api.post(urlLogin, {
              login: process.env.SMTP_USER,
              password: process.env.SMTP_PASS
            })
      
            const { session } = login.data
            
            const urlAFD = `https://${ips}/get_afd.fcgi`

            const afd = await api.post(urlAFD, {
              session: session,
              initial_date: {
                 day: daynumber,
                 month: monthNumber,
                 year: 2022
              }
            })
            
            const content = afd.data
      
            const maxLength = content.length
            
            const contentAfd = content.substr(0, maxLength - 26)
  
            file.append('/home/william/www/clp-ponto/temp/afd/', '5042.txt', contentAfd)
                
          }else {
            console.log(`O ip ${ips} não esta acessivel`)
          }
        })   
  
      })
    })


    const time = new schedule.RecurrenceRule();
    
    time.hour = 15
    time.minute = 37

    schedule.scheduleJob(time, () => {
      console.log(`enviando SFTP`)
      sftpConnect.sftpPut()
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
