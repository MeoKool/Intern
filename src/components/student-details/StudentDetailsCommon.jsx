import React, { useEffect, useState } from "react";
import axios from "axios";
import './StudentDetailsCommon.css'

import { Box, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

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
        },
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
            <Box className={'student-details-common--class-container'}>
                {classes.map(c => {
                    let status = getClassStatus(c.status);
                    return (
                        <Box key={c.id} className={'student-details-common--class-card'}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span style={{ fontSize: 25, fontWeight: 600 }}>{c.name}</span>
                                <span className='student-details-common--class-card-status' style={{ backgroundColor: status.color }}>{status.label}</span>
                            </div>
                            <div>
                                <p style={{ color: '#2b3748', fontWeight: 600, paddingTop: '20px' }}>{c.class.name} | {c.class.startDate} - {c.class.endDate}</p>
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
                <Box className='student-details-common--label'>
                    General
                </Box>
                <Box sx={{ margin: '30px 25px' }}>
                    <Grid container>
                        <Grid item md={6}>
                            <div className="student-details-common--info-field">
                                <span className="student-details-common--info-label">ID:</span>
                                <span>{user.id}</span>
                            </div>
                            <div className="student-details-common--info-field">
                                <span className="student-details-common--info-label">Name</span>
                                <span>{user.fullName}</span>
                            </div>
                            <div className="student-details-common--info-field">
                                <span className="student-details-common--info-label">Gender</span>
                                <span>{user.gender}</span>
                            </div>
                            <div className="student-details-common--info-field">
                                <span className="student-details-common--info-label">Date of birth</span>
                                <span>{user.dateOfBirth}</span>
                            </div>
                            <div className="student-details-common--info-field">
                                <span className="student-details-common--info-label">Status</span>
                                <div style={{
                                    width: 100,
                                    textAlign: 'center',
                                    fontWeight: 600,
                                    borderRadius: 8,
                                    color: '#FFF',
                                    backgroundColor: '#2d3748',
                                    padding: '5px 7px'
                                }}>{user.status}</div>
                            </div>
                        </Grid>
                        <Grid item md={6}>
                            <div className="student-details-common--info-field">
                                <span className="student-details-common--info-label">Phone:</span>
                                <span>{user.Phone}</span>
                            </div>
                            <div className="student-details-common--info-field">
                                <span className="student-details-common--info-label">Email</span>
                                <span>{user.Email}</span>
                            </div>
                            <div className="student-details-common--info-field">
                                <span className="student-details-common--info-label">Permanent residence</span>
                                <span>AAA</span>
                            </div>
                            <div className="student-details-common--info-field">
                                <span className="student-details-common--info-label">Location</span>
                                <span>{user.address}</span>
                            </div>
                            <div className="student-details-common--info-field">
                                <span className="student-details-common--info-label">Certification status</span>
                                <span>Done</span>
                            </div>
                            <div className="student-details-common--info-field">
                                <span className="student-details-common--info-label">Certification date</span>
                                <span>21/11/1111</span>
                            </div>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Box>
                <Box className='student-details-common--label'>
                    Others
                </Box>
                <Box sx={{ margin: '30px 25px' }}>
                    <Grid container>
                        <Grid item md={6}>
                            <div className="student-details--info-field">
                                <span className="student-details--info-label">University</span>
                                <span>{user.university}</span>
                            </div>
                            <div className="student-details--info-field">
                                <span className="student-details--info-label">Major</span>
                                <span>{user.major}</span>
                            </div>
                        </Grid>
                        <Grid item md={6}>
                            <div className="student-details--info-field">
                                <span className="student-details--info-label">RECer</span>
                                <span>{user.reCer}</span>
                            </div>
                            <div className="student-details--info-field">
                                <span className="student-details--info-label">GPA</span>
                                <span>{user.gpa}</span>
                            </div>
                            <div className="student-details--info-field">
                                <span className="student-details--info-label">Graduation time</span>
                                <span>{user.graduatedDate}</span>
                            </div>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Box>
                <Box className='student-details-common--label'>
                    Class information
                </Box>
                <Box>
                    <ClassContainer />
                </Box>
            </Box>
            <Box>
                <Box className='student-details-common--label'>
                    Reserving
                </Box>
                <Box>

                </Box>
            </Box>
        </>
    );
}