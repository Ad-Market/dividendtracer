import React from 'react';
import {Box} from "rebass";
import "react-datepicker/dist/react-datepicker.css";
import { TableWrapper } from '../Table/Table';
import { ChartWrapper } from '../Chart/Chart';

export const Results = ({ dividends, globalGain, todayGain, token, wallet}) => {

    return(
        <Box width={'100%'}>
            <Box m={'0 auto'} width={'80%'}>
                <ChartWrapper dividends={dividends} />
            </Box>
            <Box mt={5} mb={3} width={'100%'}>
                <TableWrapper data={dividends} />
            </Box>
        </Box>
    )
}