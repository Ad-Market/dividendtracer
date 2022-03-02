import React, {useEffect} from 'react';
import Moment from 'react-moment';
import { useTable, usePagination } from 'react-table'
import {Box, Heading, Text, Flex} from "rebass";
import DatePicker from "react-datepicker";
import * as moment from 'moment';
import { PageButton, StyledTable } from './styled';
import {IoCalendar} from 'react-icons/io5';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';

const CalendarButton = styled.div`
    background: #f7f8f8;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    color: #24262f;
    cursor: pointer;
`

const CustomCalendarInput = ({ onClick }) => (
    <CalendarButton data-tip="Filter by date" onClick={() => onClick()}>
        <IoCalendar size={18} />
        <ReactTooltip offset={{top: 5}} />
    </CalendarButton>
);

export const TableWrapper = ({data}) => {

    const [dateRange, setDateRange] = React.useState("");
    const [dateGain, setDateGain] = React.useState("");
    const [dividends, setDividends] = React.useState([]);
    const [previousDividends, setPreviousDividends] = React.useState([]);
    // const [datePickerVisible, setDatePickerVisible] = React.useState(false);

    useEffect(() => {
        let newDate = data.map(item => {
            return {
                ...item,
                tokenValue: parseFloat(item.rawTokenValue).toFixed(3),
                dollarValue: parseFloat(item.rawDollarValue).toFixed(0),
                date: new Date(parseInt(item.timestamp)*1000).toLocaleDateString()
            }
        }).sort((a,b) => {return new Date(parseInt(b.timestamp)*1000) - new Date(parseInt(a.timestamp)*1000)});
        setDividends(newDate);
        setPreviousDividends(newDate);
    }, [])
    
    const columns = React.useMemo(() => [
          {
            Header: 'Profit',
            columns: [
                {
                    Header: 'Date',
                    accessor: 'date',
                  },
                  {
                    Header: 'Rewards',
                    accessor: 'dollarValue',
                  },
                  {
                    Header: 'Tokens',
                    accessor: 'tokenValue',
                  },
            ],
          },
    ], []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        pageOptions,
        nextPage,
        previousPage,
        state: { pageIndex },
    } = useTable({columns, data: dividends, initialState: { pageIndex: 0 }}, usePagination);

    const handleDate = async (date) => {
        if(date == null){
            setDateRange("")
            setDividends(previousDividends)
        }else{
            setDateRange(date)
            await filterByDate(date)
        }
    }

    const filterByDate = async (date) => {
        let filteredData = []
        let momentDate = moment(date)
        let dateGain = 0
        dividends.map((row) => {            
            let isCurrentDate = moment.unix(row.timestamp).isSame(momentDate, 'day')
            if (isCurrentDate) {
                dateGain += parseFloat(row.rawDollarValue)
                filteredData.push(row)
            }
            return row;
        })
        setDividends(filteredData)
        setDateGain(dateGain.toFixed(2))
    }

    return(
        <>
        <Flex mb={3} justifyContent={'space-between'} alignItems="center">
            <Box>
                <Heading fontFamily={'DM Sans'} fontSize={4} color="white">Transactions</Heading>
                {dateRange !== '' && 
                    <Text mt={2} color="white" fontSize={2}>Profit on <Moment format='YYYY/MM/DD'>{dateRange}</Moment> : <strong>{dateGain} $</strong></Text>
                }
            </Box>
            <Box className={dateRange !== '' ? 'showButton' : ''} alignItems="center" display="inline-flex">
                <DatePicker id="datePicker" placeholderText="YYYY/MM/DD" dateFormat="yyyy/MM/dd"
                    selected={dateRange}
                    onChange={(date) => handleDate(date)}
                    isClearable={true}
                    customInput={<CustomCalendarInput />}
                />
            </Box>
        </Flex>
        <StyledTable {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                    ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
                prepareRow(row)
                return (
                <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                        return <td {...cell.getCellProps()}>{cell.render('Cell')} {(cell.column.Header === 'Rewards' && '$') || (cell.column.Header === 'Tokens' && 'BNB')}</td>
                    })}
                </tr>
                )
            })}
            </tbody>
        </StyledTable>
        <Box mt={4}>
            <Flex sx={{gap: '10px'}} alignItems="center" justifyContent="center">
                <PageButton onClick={() => previousPage()} disabled={pageIndex === 0}>{'<'}</PageButton>
                <Text fontSize={2} fontWeight="bold" color="white">Page {pageIndex + 1} of {pageOptions.length}</Text>
                <PageButton onClick={() => nextPage()} disabled={pageIndex === pageOptions.length - 1}>{'>'}</PageButton>
            </Flex>
        </Box>
        </>
    )

}