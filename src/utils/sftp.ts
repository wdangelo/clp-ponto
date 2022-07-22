import * as Client from 'ssh2-sftp-client';

const sftp = new Client();

export class SftpConnect {

   sftpPut() {
    const domain = 'sicoob'
    const user = 'roborh5042_00'
    sftp.connect({
      host: '172.16.0.150',
      port: 22,
      username: `${domain}\\${user}`,
      password: '@sicoob26'
    }).then(() => {
      sftp.put('/home/william/www/clp-ponto/temp/afd/5042.txt', '/opt/ponto/5042/upload/5042.txt')
      return sftp.list('/opt/ponto/5042/upload');
    }).then(data => {
      console.log(data, 'the data info');
    }).catch(err => {
      console.log(err, 'catch error');
    });
}
}



