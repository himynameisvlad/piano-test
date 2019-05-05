import { animate, state, style, transition, trigger } from '@angular/animations';

export const panelAnimations = [
    trigger('slide', [
        state('left', style({ transform: 'translateX(0)' })),
        state('right', style({ transform: 'translateX(-50%)' })),
        transition('* => *', animate(300))
    ])
];