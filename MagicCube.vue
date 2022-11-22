<script lang="ts" setup>


let rotate = [false, false, false, false, false, true];


</script>

<template>
    <div class="magic-cube">
        <div class="face" v-for="i in 6">


            <div class="side" v-if="rotate[i - 1]" :style="{ opacity: 1 }">
                <div class="bar" v-for="i in 4">
                    <div v-for="i in 3" :style="{ backgroundColor: 'red' }">{{ i }}</div>
                </div>
            </div>

            <div class="front">
                <div v-for="i in 9"></div>
            </div>
        </div>
        <div style="width: 100%;"></div>
    </div>
</template>

<style lang="scss">
.magic-cube {
    --cube-length: 300px;
    $colors: green blue red orange yellow white;


    width: var(--cube-length);
    height: var(--cube-length);
    transform-style: preserve-3d;

    transition: 500ms;
    transform: rotateY(-45deg) rotateX(135deg);
    // transform: rotateY(96deg) rotateX(50deg);
    // transform: rotateX(90deg);





    @keyframes wer {
        0% {
            transform: rotateX(45deg) rotateY(45deg);
        }

        25% {
            transform: rotateX(135deg) rotateY(135deg);
        }

        50% {
            transform: rotateX(-45deg) rotateY(-45deg);
        }

        75% {
            transform: rotateX(45deg) rotateY(-45deg);
        }

        100% {
            transform: rotateX(-180deg) rotateY(135deg);
        }
    }

    @keyframes rz {
        0% {
            transform: rotateY(-45deg) rotateX(135deg) rotateZ(90deg);
        }

        25% {
            transform: rotateY(-45deg) rotateX(135deg) rotateZ(180deg);
        }

        50% {
            transform: rotateY(-45deg) rotateX(135deg) rotateZ(270deg);
        }

        75% {
            transform: rotateY(-45deg) rotateX(135deg) rotateZ(360deg);
        }

        100% {
            transform: rotateY(-45deg) rotateX(135deg) rotateZ(450deg);
        }
    }

    // animation: wer 4s 0s infinite alternate;
    animation: rz 4s 0s infinite alternate;



    .face {
        transform-style: preserve-3d;
        position: absolute;

        width: var(--cube-length);
        height: var(--cube-length);
        transition: 500ms;


        @for $i from 1 to 7 {
            &:nth-of-type(#{$i}) {
                background-color: nth($colors, $i);

                @if $i<=2 {
                    transform: rotateX(calc(90deg * #{($i % 2) * 2 - 1})) translateZ(calc(var(--cube-length) / 2));
                }

                @if $i>2 and $i<=4 {
                    transform: rotateY(calc(90deg * #{($i % 2) * 2 - 1})) translateZ(calc(var(--cube-length) / 2));
                }

                @if $i>4 and $i<=6 {
                    transform: rotateX(calc(180deg * #{(($i+1)% 2)})) translateZ(calc(var(--cube-length) / 2));
                }
            }
        }

        &:nth-of-type(6) {
            rotate: z 90deg;
            transform-origin: center;
        }

        $faces: 1 2 3 4;

        @each $i in $faces {
            &:nth-of-type(#{$i}) {
                opacity: 0;
            }
        }


        .front {
            width: 100%;
            height: 100%;

            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: repeat(3, 1fr);

            @for $i from 1 to 10 {
                :nth-child(#{$i}) {
                    border-left: 1px solid black;
                    border-bottom: 1px solid black;

                    @if $i<=3 {
                        border-top: 1px solid black;
                    }

                    @if $i % 3==0 {
                        border-right: 1px solid black;
                    }
                }
            }
        }

        .side {
            --cube-half-length: calc(var(--cube-length) / 2);
            --cube-third-length: calc(var(--cube-length) / 3);

            transform-style: preserve-3d;
            position: absolute;
            top: calc(var(--cube-third-length));

            @for $i from 1 to 5 {
                .bar:nth-of-type(#{$i}) {
                    position: absolute;
                    // border: 1px solid black;
                    width: calc(var(--cube-length));
                    height: calc(var(--cube-third-length));
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);

                    div {
                        border-top: 1px solid black;
                        border-bottom: 1px solid black;
                        border-right: 1px solid black;

                        &:nth-of-type(1) {
                            border-left: 1px solid black;
                        }
                    }

                    @if $i ==1 {
                        transform: rotateZ(90deg) rotateX(90deg) translate3d(0, calc(var(--cube-third-length)/-2), var(--cube-half-length)); // rotateX(90deg) 
                    }

                    @if $i==2 {
                        transform: rotateZ(-90deg) rotateX(90deg) translate3d(0, calc(var(--cube-third-length)/-2), var(--cube-half-length)); // rotateX(90deg) 
                    }

                    @if $i==3 {
                        transform: rotateX(90deg) translate3d(0, calc(var(--cube-third-length)/-2), var(--cube-half-length)); // rotateX(90deg) 
                    }

                    @if $i==4 {
                        transform: rotateX(-90deg) translate3d(0, calc(var(--cube-third-length)/2), var(--cube-half-length)); // rotateX(90deg) 
                    }
                }
            }

        }

    }

}
</style>