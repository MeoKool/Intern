import React, { useEffect, useState } from "react";
import axios from "axios";
import './StudentDetailEdit.scss'

import { Box, Button, Grid, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useParams } from "react-router-dom";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import dayjs from "dayjs";

export default function StudentDetailsCommon() {

    const [user, setUser] = useState({});
    let param = useParams()

    const classStatus = [
        {
            code: 'on-boarding',
            label: 'On boarding',
            color: '#2d3748'
        },
        {
            code: 'finish-class',
            label: 'Finish class',
            color: '#2F903F'
        }
    ]

    const classes = [
        {
            id: 1,
            name: 'DevOps Foundation',
            status: 'on-boarding',
            class: {
                name: 'HCM21_FR_DevOps_01',
                startDate: '22/04/2021',
                endDate: '22/10/2021'
            }
        },
        {
            id: 2,
            name: 'DevOps Advanced',
            status: 'finish-class',
            class: {
                name: 'HCM21_FR_DevOps_01',
                startDate: '22/04/2021',
                endDate: '22/10/2021'
            }
        }
    ]

    const fetchUser = async (id) => {
        try {
            const response = await axios.get(`https://6535e093c620ba9358ecba91.mockapi.io/student/${id}`);
            setUser(response.data ? response.data : {});
        } catch (err) {
            setUser({});
        }
    };

    useEffect(() => {
        fetchUser(param.id);
    }, [])

    const ClassContainer = () => {

        const getClassStatus = (statusCode) => {
            const statusObject = classStatus.find(status => status.code === statusCode);

            return statusObject ? statusObject : { code: 'default', label: 'Default', color: '#000000' };
        };

        return (
            <Box className={'student-detail-edit--class-container'}>
                <Button className='btn-blank' sx={{ marginRight: '25px' }}>
                    <AddCircleOutlineIcon sx={{ fontSize: 35 }} />
                </Button>
                {classes.map(c => {
                    let status = getClassStatus(c.status);
                    return (
                        <Box key={c.id} className={'student-detail-edit--class-card'}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span className='text-wrap' style={{ fontSize: 25, fontWeight: 600 }}>
                                    {c.name}
                                </span>
                                <span className='text-wrap student-detail-edit--class-card-status' style={{ backgroundColor: status.color }}>{status.label}</span>
                            </div>
                            <div>
                                <p style={{ color: '#2b3748', fontWeight: 600, paddingTop: '20px', fontSize: 14 }}>{c.class.name} | {c.class.startDate} - {c.class.endDate}</p>
                            </div>
                            <div>
                                <p style={{ color: '#2b3748', paddingTop: '20px', fontSize: '14px' }}>Note about this</p>
                            </div>
                        </Box>
                    );
                })}
            </Box>
        )
    }

    return (
        <>
            <h2
                style={{
                    fontSize: "30px",
                    marginBottom: "20px",
                    fontFamily: "Arial, sans-serif",
                    fontWeight: "bold",
                    backgroundColor: "#2d3748",
                    color: "white",
                    padding: "20px",
                    marginTop: "1px",
                }}
            >
                Student Details
            </h2>
            <Box>
                <Box className='student-detail-edit--label'>
                    General
                </Box>
                <Box className='student-detail-edit--box'>
                    <Grid container spacing={4}>
                        <Grid item md={6}>
                            <div className="student-detail-edit--info-field">
                                <span className="student-detail-edit--info-label">ID:</span>
                                <TextField value={user.id} />
                            </div>
                            <div className="student-detail-edit--info-field">
                                <span className="student-detail-edit--info-label">Name</span>
                                <TextField value={user.phone} />
                            </div>
                            <div className="student-detail-edit--info-field">
                                <span className="student-detail-edit--info-label">Gender</span>
                                <FormControl fullWidth>
                                    <Select id="gender" value={'male'}>
                                        <MenuItem value="male">Male</MenuItem>
                                        <MenuItem value="female">Female</MenuItem>
                                        <MenuItem value="others">Others</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="student-detail-edit--info-field">
                                <span className="student-detail-edit--info-label">Date of birth</span>
                                <DatePicker defaultValue={dayjs('2003-04-15')} />
                            </div>
                            <div className="student-detail-edit--info-field">
                                <span className="student-detail-edit--info-label">Status</span>
                                <FormControl fullWidth>
                                    <Select id="status" value={user.status}>
                                        <MenuItem value="in-class">In class</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </Grid>
                        <Grid item md={6}>
                            <div className="student-detail-edit--info-field">
                                <span className="student-detail-edit--info-label">Phone:</span>
                                <TextField value={user.Phone} />
                            </div>
                            <div className="student-detail-edit--info-field">
                                <span className="student-detail-edit--info-label">Email</span>
                                <TextField value={user.Email} />
                            </div>
                            <div className="student-detail-edit--info-field">
                                <span className="student-detail-edit--info-label">Permanent residence</span>
                                <FormControl fullWidth>
                                    <Select labelId="permanentResidence-label" id="permanentResidence" value={user.permanentResidence}>
                                        <MenuItem value="AAA">AAA</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="student-detail-edit--info-field">
                                <span className="student-detail-edit--info-label">Location</span>
                                <TextField value={user.address} />
                            </div>
                            <div className="student-detail-edit--info-field">
                                <span className="student-detail-edit--info-label">Certification status</span>
                                <FormControl fullWidth>
                                    <Select labelId="certificationStatus-label" id="certificationStatus" value={user.certificationStatus}>
                                        <MenuItem value="Done">Done</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="student-detail-edit--info-field">
                                <span className="student-detail-edit--info-label">Certification date</span>
                                <DatePicker defaultValue={dayjs(new Date())} />

                            </div>
                        </Grid>
                    </Grid>
                    <Box className='student-detail-edit--btn-action'>
                        <Button className='student-detail-edit--btn-action-cancel'>Cancel</Button>
                        <Button className='student-detail-edit--btn-action-save'>Save</Button>
                    </Box>
                </Box>

            </Box>
            <Box>
                <Box className='student-detail-edit--label'>
                    Others
                </Box>
                <Box className='student-detail-edit--box'>
                    <Grid container spacing={4}>
                        <Grid item md={6}>
                            <div className="student-detail-edit--info-field">
                                <span className="student-details--info-label">University</span>
                                <FormControl fullWidth>
                                    <Select id="university" value={user.university}>
                                        <MenuItem value="15">FPT University HCM</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="student-detail-edit--info-field">
                                <span className="student-details--info-label">Major</span>
                                <FormControl fullWidth>
                                    <Select id="major" value={user.university}>
                                        <MenuItem value="15">FPT University HCM</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="student-detail-edit--info-field">
                                <span className="student-details--info-label">RECer</span>
                                <TextField value={user.reCer} />
                            </div>
                        </Grid>
                        <Grid item md={6}>
                            <div className="student-detail-edit--info-field">
                                <span className="student-details--info-label">GPA</span>
                                <TextField defaultValue={user.gpa} />
                            </div>
                            <div className="student-detail-edit--info-field">
                                <span className="student-details--info-label">Graduation time</span>
                                <DatePicker defaultValue={dayjs(new Date())} />
                            </div>
                        </Grid>
                    </Grid>
                    <Box className='student-detail-edit--btn-action'>
                        <Button className='student-detail-edit--btn-action-cancel'>Cancel</Button>
                        <Button className='student-detail-edit--btn-action-save'>Save</Button>
                    </Box>
                </Box>

            </Box>
            <Box>
                <Box className='student-detail-edit--label'>
                    Class information
                </Box>
                <Box className='student-detail-edit--box'>
                    <ClassContainer />
                    <Box className='student-detail-edit--btn-action'>
                        <Button className='student-detail-edit--btn-action-cancel'>Cancel</Button>
                        <Button className='student-detail-edit--btn-action-save'>Save</Button>
                    </Box>
                </Box>

            </Box>
            <Box>
                <Box className='student-detail-edit--label'>
                    Reserving
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button className='student-detail-edit--btn-reserve'><AddCircleOutlineIcon /> Add reserving</Button>
                </Box>
            </Box>
        </>
    );
}