/**
 * Types of motor direction
 */
enum RunDirection {
    //% block="前进"
    forward,
    //% block="后退"
    back
}

enum TurnDirection {
    //% block="左转"
    left,
    //% block="右转"
    right
}

enum LedPosition {
    //% block="灯1"
    p1 = 1,
    //% block="灯2"
    p2 = 2,
    //% block="灯3"
    p3 = 3,
    //% block="灯4"
    p4 = 4,
    //% block="灯5"
    p5 = 5,
    //% block="全部"
    all = 0,
}


/**
 * 设置电机按方向移动或停止
 */
//% weight=70 icon="\uf0e7" color=#1B80C4
namespace Motor {
    //microbit与coocoo的点击使用哪个pin连接的，相当于地址，这个需要确定是什么
    const COOCOO_ADDRESS = 0x40
    //目前不确定颜色的地址是什么
    const COOCOO_COLOR_ADDRESS = 0x40
    //同上
    const COOCOO_BUZZER_ADDRESS = 0x40
    const CODE1 = 0xff
    const CODE2 = 0x55
    const READMODULE = 0x01
    const WRITEMODULE = 0x02
    

    /**
     * 前后运动
     */
    //% blockId=coocoo_run block="运动 %direction 速度 %speed"
    //% speed.min=0 speed.max=255
    //% weight=108
    export function moveRun(direction: RunDirection, speed: number): void {
        if (speed < 0) speed = 0;

        if (direction == RunDirection.forward) {
            motor(speed,speed);
        } else if (direction == RunDirection.back) {
            motor(-speed,-speed);
        }
    }

    /**
     * 左转右转
     */
    //% blockId="coocoo_turn" block="运动 %direction 速度 %speed"
    //% speed.min=0 speed.max=255
    //% weight=109
    export function moveTurn(direction: TurnDirection, speed: number): void {
        if (speed < 0) speed = 0;

        if (direction == TurnDirection.left) {
            motor(-speed,speed);
        } else if (direction == TurnDirection.right) {
            motor(speed,-speed);
        }
    }
    /**
     * 设置双电机
     */
    //% blockId=coocoo_double_motor block="左电机 速度 %leftSpeed 右电机 速度 %rightSpeed"
    //% weight=110
    //% leftSpeed.min=-255 leftSpeed.max=255
    //% rightSpeed.min=-255 rightSpeed.max=255
    export function doubleMotor(leftSpeed: number, rightSpeed: number): void {
        motor(leftSpeed,rightSpeed);
    }

    /**
     * 设置LED 选择颜色
     */
    //% block="设置板载LED %position| 颜色为 红色值 %red| 绿色值 %green| 蓝色值 %blue"
    //% red.min=0 red.max=255
    //% green.min=0 green.max=255
    //% blue.min=0 blue.max=255
    export function setLed(position: LedPosition, red: number, green: number, blue: number): void {
        led(position, red, green,blue);
    }

    /**
     * 设置蜂鸣器
     */
    //% block="设置蜂鸣器 低音调 %lowTone| 高音调 %highTone| 低节拍 %lowBeat| 高节拍 %highBeat"
    export function setBuzzer(lowTone: number, highTone: number, lowBeat: number, highBeat: number): void {
        buzzer(lowTone, highTone, lowBeat, highBeat);
    }

    // let initialized = false
    //let initializedMatrix = false
    //let neoStrip: neopixel.Strip;
    //let matBuf = pins.createBuffer(17);
    //let distanceBuf = 0;

    // function initCOOCOO(): void {
    //     i2cwrite(COOCOO_ADDRESS, MODE1, 0x00)
    //     setFreq(50);
    //     for (let idx = 0; idx < 16; idx++) {
    //         setPwm(idx, 0 ,0);
    //     }
    //     initialized = true
    // }



    function motor(leftspeed: number, rightspeed: number): void {

        let buf = pins.createBuffer(10);

        buf[0] = CODE1;
        buf[1] = CODE2;
        buf[2] = 0x07;
        buf[3] = 0;
        buf[4] = WRITEMODULE;
        buf[5] = 0x05;
        buf[6] = leftspeed & 0xff;
        buf[7] = (leftspeed >> 8) & 0xff;
        buf[8] = rightspeed & 0xff;
        buf[9] = (rightspeed >> 8) & 0xff;
        
        pins.i2cWriteBuffer(COOCOO_ADDRESS, buf);
    }

    function led(position: number, red: number, green: number, blue: number): void {

        let buf = pins.createBuffer(12);

        buf[0] = CODE1;
        buf[1] = CODE2;
        buf[2] = 0x09;
        buf[3] = 0;
        buf[4] = WRITEMODULE;
        buf[5] = 0x08;
        buf[6] = 0;
        buf[7] = 0;
        buf[8] = position;
        buf[9] = red;
        buf[10] = green;
        buf[11] = blue;
        
        pins.i2cWriteBuffer(COOCOO_COLOR_ADDRESS, buf);
    }

    function buzzer(lowTone: number, highTone: number, lowBeat: number, highBeat: number): void {

        let buf = pins.createBuffer(12);

        buf[0] = CODE1;
        buf[1] = CODE2;
        buf[2] = 0x09;
        buf[3] = 0;
        buf[4] = WRITEMODULE;
        buf[5] = 0x22;
        buf[6] = 0;
        buf[7] = 0;
        buf[8] = lowTone&0xff;
        buf[9] = highTone&0xff;
        buf[10] = lowBeat&0xff;
        buf[11] = highBeat&0xff;
            
        pins.i2cWriteBuffer(COOCOO_BUZZER_ADDRESS, buf);
    }

}
