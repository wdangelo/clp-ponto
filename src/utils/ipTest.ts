import * as tcpp from 'tcp-ping';


export function ipTest(ip: string) {
    tcpp.probe(ip, 80, async (err, available) => {

        
        if (err) {
            console.log(err)
            return
        }

        return
        
    })
}