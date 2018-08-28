/**
 * Types of motor direction
 */
enum MotorDirection {
    '停止' = 0,
    '前进' = 1,
    '后退' = 2,
    '左转' = 3,
    '右转' = 4
}

/**
 * 设置电机按方向移动或停止
 */
//% weight=70 icon="\uf185" color=#EC7505
namespace Motor {
    /**
     * 操作电机
     */
    //% blockId=motor_move block="电机驱动 %dire"
    export function move(dire: MotorDirection): boolean {
        return true;
    }

}
