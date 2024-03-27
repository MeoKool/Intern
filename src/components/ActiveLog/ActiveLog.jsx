import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';

const ActiveLog = () => {
  const [logs, setLogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); 
  const [logsPerPage, setLogsPerPage] = useState(10);
  
  useEffect(() => {
    axios.get('https://65f10a2eda8c6584131cbf7d.mockapi.io/ActiveLog')
      .then(response => {
        setLogs(response.data);
      })
      .catch(error => {
        console.error('Error fetching logs:', error);
      });
  }, []);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setLogsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const indexOfLastLog = (currentPage + 1) * logsPerPage;
  const indexOfFirstLog = currentPage * logsPerPage;
  const currentLogs = logs.slice(indexOfFirstLog, indexOfLastLog);

  return (
    <div style={{ margin: 'auto', maxWidth: '50%' }}>
      <TableContainer component={Paper}>
        <Table style={{ border: '2px solid black' }}>
          <TableHead>
            <TableRow style={{backgroundColor: "#0B2136"}}>
              <TableCell colSpan={4} style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', paddingBottom: "10px" }}>Activites Logs</TableCell>
            </TableRow>
            <TableCell colSpan={4} style={{paddingBottom: "1px"}}></TableCell>
            <TableRow style={{backgroundColor: "#0B2136"}}>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>No</TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Datetime</TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Modified by</TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentLogs.map((log, index) => (
              <TableRow key={log.id}>
                <TableCell style={{fontWeight: 'bold'}}>{indexOfFirstLog + index + 1}</TableCell>
                <TableCell style={{fontWeight: 'bold'}}>{log.Datetime}</TableCell>
                <TableCell style={{fontWeight: 'bold'}}>{log.Modified}</TableCell>
                <TableCell style={{fontWeight: 'bold'}}>{log.Action}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[10, 15, 30]}
        component="div"
        count={logs.length}
        rowsPerPage={logsPerPage}
        page={currentPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default ActiveLog;
