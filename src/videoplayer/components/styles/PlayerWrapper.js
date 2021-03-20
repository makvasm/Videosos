import styled               from 'styled-components';
import widthBreakpointValue from '../../../utils/widthBreakpointValue';

export const PlayerWrapper = styled.div`
    width: ${props => widthBreakpointValue(props.screenWidth ?? window.innerWidth)};
    margin: auto;
`;