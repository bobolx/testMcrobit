

//% weight=70 icon="\uf0e7" color=#1B80C4
namespace CooCoo {
    
    
    
    export enum MotorDirection {
        //% block="左侧"
        left,
        //% block="右侧"
        right
    }

    /**
     * 设置电机
     */
    //% blockId=coocoo_motor block="电机 %direction 速度 %speed"
    //% speed.min=0 speed.max=255
    //% weight=108
    export function motorRun(direction: MotorDirection, speed: number): void {
        
        
    }

}


