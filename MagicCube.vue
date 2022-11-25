<script lang="ts" setup>


import { MagicCube } from './MagicCube'
import { watch, computed, ref, Ref } from 'vue'

const props = defineProps<{
    colors?: string[]
    cube?: Ref<MagicCube>
    animated?: boolean
}>()


defineEmits<{
    (e: 'click-at-face', face: number): void
}>()


let cube = props.cube ? props.cube : ref(new MagicCube())

let bais = [[4, 5, 1, 2], [5, 4, 2, 1]]
let bar: { [propName: number]: number[] } = { 4: [2, 5, 8], 5: [6, 7, 8], 1: [0, 3, 6], 2: [0, 1, 2] }
let rotate_ = ['', 'x 90deg', 'y 90deg', 'z -90deg', 'x -90deg', 'y -90deg', 'z 90deg',]


let rotate_face = ref(-1)
// ! not so good

function is_moving_bar(face: number, j: number) {
    if (rotate_face.value == -1) return null
    let idx = cube.value.nface.map(e => (e + rotate_face.value) % 6).indexOf(face)
    if (idx != -1 && cube.value.bar[idx].indexOf(j) != -1) return ''
    return null
}

/*
function processInput(evt: KeyboardEvent) {// will changed
    // console.log(evt)
    let r = evt.code.match(/(?:Digit|Numpad)(\d)/)

    if (r?.[1]) {
        let num = Number(r?.[1])
        if (num >= 0 && num < 6) {
            rotate_face.value = Number(r?.[1]);
            if (!props.animated) cube.value.rotate(num, evt.shiftKey ? 0 : 1);

            // await
        }
        // console.log(rotate_face.value)
    }
}

function fun(evt: TransitionEvent, num: number) {// will changed
    console.log('done')
    if (rotate_face.value != -1) {
        rotate_face.value = -1
        // evt.target.style.transition = "0ms"
        // getComputedStyle(evt.target).length

        cube.value.rotate(num, 1);
    }
}
*/
</script>


<template>
    <div class="magic-cube">
        <!-- @keyup="processInput($event)" tabindex="0" -->

        <div class="face" v-for="(_, i) in 6" :class="{ 'rotating': i == rotate_face }"
             :style="{ 'rotate': rotate_face == i ? rotate_[i + 1] : '', transition: animated ? '500ms' : '0ms' }">
            <!-- @transitionend="fun($event, i)" -->

            <div class="side" v-if="animated">
                <div class="bar" v-for="(_, j) in 4">
                    <div v-for="k in 3"
                         :style="{ backgroundColor: cube.colors[cube.state[(i + bais[i % 2][j]) % 6][bar[bais[i % 2][j]][i % 2 ? k - 1 : 3 - k]] - 1] }">
                    </div>
                </div>
            </div>

            <div class="front" @click="$emit('click-at-face', i)">
                <div v-for="(_, j) in 9" :style="{ backgroundColor: cube.colors[cube.state[i][j] - 1] }" :hide="animated ? is_moving_bar(i, j) : null">
                </div>
            </div>

        </div>

    </div>
</template>

<style lang="scss">
[hide] {
    opacity: 0;
}

.magic-cube {
    transform: rotateX(155deg) rotateZ(180deg) rotateY(-45deg);

    // animation: wer 4s 0s infinite alternate;
    // animation: rz 4s 0s infinite alternate;
}

.magic-cube {
    --cube-length: 300px;
    --cube-half-length: calc(var(--cube-length) / 2);

    transform-style: preserve-3d;

    width: var(--cube-length);
    height: var(--cube-length);

    .face.rotating .side {
        opacity: 1;
    }

    .face {
        position: absolute;
        transform-style: preserve-3d;

        width: var(--cube-length);
        height: var(--cube-length);

        .front {
            width: 100%;
            height: 100%;

            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: repeat(3, 1fr);

            div {
                border-left: 1px solid black;
                border-bottom: 1px solid black;
            }
        }

        .side {
            --cube-third-length: calc(var(--cube-length) / 3);
            --cube-sixth-length-neg: calc(var(--cube-third-length)/-2);

            opacity: 0;
            position: absolute;
            transform-style: preserve-3d;
            top: var(--cube-third-length);

            .bar {
                display: grid;
                position: absolute;
                width: calc(var(--cube-length));
                height: calc(var(--cube-third-length));
                grid-template-columns: repeat(3, 1fr);

                div {
                    border-bottom: 1px solid black;
                    border-right: 1px solid black;

                    &:nth-of-type(1) {
                        border-left: 1px solid black;
                    }
                }
            }
        }

        $x: 0 -1 2 0 1 0;
        $y: 1 0 0 -1 0 0;
        $z: 0 1 1 -1 0 0;
        $dir: row column;
        $bt: 1 4 7 1 2 3;
        $br: 7 8 9 3 6 9;

        @for $i from 1 to 7 {
            &:nth-of-type(#{$i}) {
                transform: rotateX(#{nth($x, $i)*90}deg) rotateY(#{nth($y, $i)*90}deg) rotateZ(#{nth($z, $i)*90}deg) translateZ(var(--cube-half-length));

                .front {
                    grid-auto-flow: #{nth($dir, 2 - $i % 2)};

                    @for $j from 1 to 4 {

                        // ! not so good
                        :nth-child(#{nth($bt, $j + ($i % 2) * 3)}) {
                            border-top: 1px solid black;
                        }

                        :nth-child(#{nth($br, $j + ( $i % 2) * 3)}) {
                            border-right: 1px solid black;
                        }
                    }
                }

                .side .bar div {
                    @if $i%2==1 {
                        // ! not so good
                        border-top: 1px solid black;
                    }
                }
            }
        }

        $sx: 1 1 -1 1;
        $sz: 0 -1 2 1;

        @for $i from 1 to 5 {
            .side .bar:nth-of-type(#{$i}) {
                @if $i%2 ==1 {
                    transform: rotateX(#{nth($sx,$i)*90}deg) rotateZ(#{nth($sz,$i)*90}deg) translate3d(0, var(--cube-sixth-length-neg), var(--cube-half-length));
                }

                @if $i%2==0 {
                    transform: rotateZ(#{nth($sz,$i)*90}deg) rotateX(#{nth($sx,$i)*90}deg) translate3d(0, var(--cube-sixth-length-neg), var(--cube-half-length));
                }
            }
        }
    }

}
</style>