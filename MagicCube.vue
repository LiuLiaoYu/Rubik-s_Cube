<script lang="ts" setup>
// import {  } from 'fs';
import { watch, computed, ref } from 'vue'

let colors = ["white", 'blue', 'orange', "yellow", "green", 'red',]

let face_state = [1, 2, 3, 4, 5, 6].map(e => Array(9).fill(e))


let bar = [[2, 5, 8], [6, 7, 8], [0, 3, 6], [0, 1, 2]]
let bais = [[5, 4, 2, 1], [4, 5, 1, 2]]

let b_ = [4, 5, 1, 2]


let rotate_face = ref(-1)

// let is_moving_bar = computed(()=>{
// 
// })

// watch(rotate_face, () => {
    // setTimeout(() => {rotate_face.value = -1 }, 1000);
// })

function is_moving_bar(face: number, j: number) {
    if (rotate_face.value == -1) return false
    let idx = b_.map(e => (e + rotate_face.value) % 6).indexOf(face)
    if (idx != -1 && bar[idx].indexOf(j) != -1) return true;
    return false
}


let rotate_ = ['', 'x 90deg', 'y 90deg', 'z -90deg', 'x -90deg', 'y -90deg', 'z 90deg',]


function processInput(evt: KeyboardEvent) {
    let r = evt.code.match(/(?:Digit|Numpad)(\d)/)

    if (r?.[1]) {
        let num = Number(r?.[1])
        if (num >= 0 && num < 6) {
            rotate_face.value = Number(r?.[1]);
        }
        // console.log(rotate_face.value)
    }
}

</script>


<template>
    <div class="magic-cube" @keyup="processInput($event)" tabindex="0">

        <div class="face" v-for="i in 6" :class="{ 'rotating': i - 1 == rotate_face }" :style="{ 'rotate': rotate_face == i - 1 ? rotate_[i] : '' }">

            <div class="side">
                <div class="bar" v-for="j in 4">
                    <div v-for="k in 3" :style="{ backgroundColor: colors[face_state[(i - 1 + bais[i % 2][j - 1]) % 6][bar[j - 1][k - 1]] - 1] }"></div>
                </div>
            </div>

            <div class="front" :class="{ 'invisiable': false }">
                <div v-for="j in 9" :style="{ backgroundColor: colors[face_state[i - 1][j - 1] - 1] }" :class="{ 'invisiable': is_moving_bar(i - 1, j - 1) }">
                </div>
            </div>

        </div>

    </div>
</template>

<style lang="scss">
@import url('/animation.scss');

.invisiable {
    opacity: 0;
}

.magic-cube {
    --cube-length: 300px;
    --cube-half-length: calc(var(--cube-length) / 2);

    width: var(--cube-length);
    height: var(--cube-length);
    transform-style: preserve-3d;

    transition: 500ms;
    // transform: rotateY(-45deg) rotateX(-45deg) rotateZ(-45deg);
    transform: rotateX(155deg) rotateZ(180deg) rotateY(-45deg);
    // transform: rotateY(0deg) rotateX(0deg);
    // transform: rotateY(90deg) rotateX(0deg);
    // transform: rotateY(180deg) rotateX(0deg);
    // transform: rotateY(270deg) rotateZ(45deg);
    // 

    // animation: wer 4s 0s infinite alternate;
    // animation: rz 4s 0s infinite alternate;

    .face {
        position: absolute;
        transform-style: preserve-3d;

        width: var(--cube-length);
        height: var(--cube-length);

        transition: 500ms;

        @for $i from 1 to 7 {
            &:nth-of-type(#{$i}) {
                @if $i ==1 {
                    transform: rotateY(90deg) translateZ(var(--cube-half-length));
                }

                @if $i==2 {
                    transform: rotateX(-90deg) rotateZ(90deg) translateZ(var(--cube-half-length));
                }

                @if $i==3 {
                    transform: rotateX(180deg) rotateZ(90deg) translateZ(var(--cube-half-length));
                }

                @if $i==4 {
                    transform: rotateY(-90deg) rotateZ(-90deg) translateZ(var(--cube-half-length));
                }

                @if $i==5 {
                    transform: rotateX(90deg) translateZ(var(--cube-half-length));
                }

                @if $i==6 {
                    transform: rotateX(0) translateZ(var(--cube-half-length));
                }

                .front {
                    @if $i%2==1 {
                        grid-auto-flow: row;
                        // border: 10px solid black;
                    }

                    @else {
                        grid-auto-flow: column;
                    }

                    @for $j from 1 to 10 {
                        :nth-child(#{$j}) {
                            border-left: 1px solid black;
                            border-bottom: 1px solid black;

                            @if $i%2==1 {
                                @if $j<4 {
                                    border-top: 1px solid black;
                                }

                                @if $j % 3==0 {
                                    border-right: 1px solid black;
                                }
                            }

                            @else {
                                @if $j % 3==1 {
                                    border-top: 1px solid black;
                                }

                                @if $j>6 {
                                    border-right: 1px solid black;
                                }
                            }

                            // border: 1px solid black;
                        }
                    }

                }

                .side {
                    .bar {
                        div {
                            @if $i%2==1 {
                                border-top: 1px solid black;
                            }
                        }
                    }
                }
            }
        }

        // $faces: 1 2 3 4;
        // 
        // @each $i in $faces {
        // &:nth-of-type(#{$i}) {
        // opacity: 0;
        // }
        // }


        // @for $i from 1 to 6 {
        // .front:nth-of-type(#{$i}) {
        // @if $i ==1 {
        // grid-auto-flow: column;
        // border: 1px red solid;
        // border: 30px red solid;
        // }
        // @if $i == 2 {
        // grid-auto-flow: row;
        // }
        // }
        // }


        .front {
            width: 100%;
            height: 100%;

            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: repeat(3, 1fr);
        }

        .side {
            position: absolute;
            transform-style: preserve-3d;
            opacity: 0;

            --cube-half-length: calc(var(--cube-length) / 2);
            --cube-third-length: calc(var(--cube-length) / 3);

            top: var(--cube-third-length);


            @for $i from 1 to 5 {
                .bar:nth-of-type(#{$i}) {
                    position: absolute;
                    width: calc(var(--cube-length));
                    height: calc(var(--cube-third-length));
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);

                    div {
                        border-bottom: 1px solid black;
                        border-right: 1px solid black;

                        &:nth-of-type(1) {
                            border-left: 1px solid black;
                        }
                    }

                    @if $i ==1 {
                        transform: rotateX(90deg) translate3d(0, calc(var(--cube-third-length)/-2), var(--cube-half-length)); // rotateX(90deg) 
                    }

                    @if $i==2 {
                        transform: rotateZ(-90deg) rotateX(90deg) translate3d(0, calc(var(--cube-third-length)/-2), var(--cube-half-length)); // rotateX(90deg) 
                    }

                    @if $i==3 {
                        transform: rotateX(-90deg) rotateZ(180deg) translate3d(0, calc(var(--cube-third-length)/-2), var(--cube-half-length)); // rotateX(90deg) 
                    }

                    @if $i==4 {
                        transform: rotateZ(90deg) rotateX(90deg) translate3d(0, calc(var(--cube-third-length)/-2), var(--cube-half-length)); // rotateX(90deg) 
                    }
                }
            }



        }

        &.rotating {
            .side {
                opacity: 1;
            }
        }

    }

}
</style>