

import {
    useLayoutEffect
} from 'react'

export const useBrowserLayoutEffect =
    typeof window !== 'undefined' ? useLayoutEffect : () => {}


const keyframes = {
    headingTeste: ({
        section,
        container
    }) => ({
        [section.topAt('container-bottom')]: {
            translateX: -container.width,
        },
        [section.topAt('container-top') - container.height / 4]: {
            translateX: 0,
        },
        [section.topAt('container-top') + container.height / 4]: {
            translateX: 0,
        },
        [section.bottomAt('container-top')]: {
            translateX: container.width,
        },
    }),
    headingV2: ({
        section,
        container
    }) => ({
        [section.topAt("container-bottom")]: {
            translateY: 50,
            opacity: 0
        },
        [section.topAt('container-top') - container.height / 4]: {
            translateX: 0,
        },
        [section.bottomAt("container-top")]: {
            translateY: 0,
            opacity: 1
        },
    }),
    heading: {
        [0]: {
            translateY: 50,
            opacity: 0
        },
        [400]: {
            translateY: 0,
            opacity: 1
        },
    },
}