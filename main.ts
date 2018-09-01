

//% weight=70 icon="\uf0e7" color=#1B80C4
namespace CooCoo {
    
    export enum MotorRotation {
        //% block="正转"
        positive = 1,
        //% block="反转"
        reverse = 0
    }
    
    export enum MotorDirection {
        //% block="左侧"
        left,
        //% block="右侧"
        right
    }



    /**
     * 设置电机
     */
    //% blockId=coocoo_motor block="电机 %direction 方向 %rotation 速度 %runSpeed"
    //% speed.min=0 speed.max=255
    //% weight=108
    export function motorRun(direction: MotorDirection, rotation: MotorRotation, speed: number): void {
        if(direction = MotorDirection.left){
            pins.analogWritePin(AnalogPin.P1, speed);
            pins.digitalWritePin(DigitalPin.P8, rotation);
        }
        if(direction = MotorDirection.right){
            pins.analogWritePin(AnalogPin.P15, speed);
            pins.digitalWritePin(DigitalPin.P12, rotation);
        }
    }

}


