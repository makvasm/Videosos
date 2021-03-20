import { breakpoints } from './widthBreakpoints';

export default function widthBreakpointValue(width)
{
    if(!breakpoints || !typeof(breakpoints) === 'object' || !Number.isInteger(width)) return;
    let keysValues = Object.entries(breakpoints);
    let result     = null;

    keysValues.forEach(([point, value]) => {
        if(result) return;
        if(width < point) result = value;
    });

    return result ?? keysValues[keysValues.length - 1][1]
}