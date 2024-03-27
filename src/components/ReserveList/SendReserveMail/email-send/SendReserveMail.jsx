import { useState, forwardRef, useEffect } from 'react';
import { Box, MenuItem, FormControl, TextField, Slide, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormHelperText } from '@mui/material';
import './SendReserveMail.scss'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import PreviewReserveMail from '../email-preview/PreviewReserveMail';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function SendReserveMail({ user, handleClose }) {

    const [templateUUID, setTemplateUUID] = useState(null)
    const [templateUUIDError, setTemplateUUIDError] = useState(false)
    const [templateList, setTemplateList] = useState([])

    const [menu, setMenu] = useState({
        send: false,
        preview: false
    })

    const openMenu = (menuType) => {
        setMenu((prevMenu) => ({
            send: menuType === 'send',
            preview: menuType === 'preview'
        }));

        console.log(menu)
    };

    const resetMenu = () => {
        setMenu({
            send: false,
            preview: false
        });
    };

    const handleChange = (e) => {
        let value = e.target.value

        if (value !== null) {
            setTemplateUUID(e.target.value)
            setTemplateUUIDError(false)
        } else {
            setTemplateUUIDError(true)
        }
    }

    useEffect(() => {
        if (user == null) {
            resetMenu()
            return
        }

        setTemplateList([
            {
                uuid: 'aaa',
                title: 'Template 01'
            },
            {
                uuid: 'bbb',
                title: 'Template 02'
            },
            {
                uuid: 'ccc',
                title: 'Template 03'
            }
        ])

        openMenu('send')
    }, [user])

    const previewMail = () => {
        if (templateUUID == null) {
            openMenu('send')
            setTemplateUUIDError(true)
            return
        }

        setTemplateUUIDError(false)
        openMenu('preview')
    }

    const sendMail = () => {
        if (templateUUID == null) {
            openMenu('send')
            setTemplateUUIDError(true)
            return
        }

        setTemplateUUIDError(false)
        setTemplateUUID(null)
        //API post goes here
        handleClose()
    }

    return (
        <Box>
            <Dialog
                className='send-reserve-mail--dialog'
                open={menu.send}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                PaperProps={{ sx: { borderRadius: "15px" } }}
            >
                <DialogTitle className='title'>
                    <p>Send remind email</p>
                    <div className='btn-close'>
                        <HighlightOffIcon sx={{ width: '30px', height: '30px' }} onClick={handleClose} />
                    </div>
                </DialogTitle>
                <DialogContent className='content'>
                    <Box>
                        <Box className='field'>
                            <p className='field-title'>Categories</p>
                            <p>Reserve</p>
                        </Box>
                        <Box className='field'>
                            <p className='field-title'>Apply to</p>
                            <p>Student</p>
                        </Box>
                        <Box className='field'>
                            <p className='field-title'>Send to</p>
                            <p><i>All</i></p>
                        </Box>
                        <Box className='field'>
                            <p className='field-title'>Template name</p>
                            <FormControl fullWidth>
                                <TextField
                                    select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    className='field-template-menu'
                                    value={templateUUID}
                                    onChange={handleChange}
                                >
                                    {
                                        templateList.map(t => (
                                            <MenuItem value={t.uuid} sx={{ width: '100%' }}>{t.title}</MenuItem>
                                        ))
                                    }
                                </TextField>
                                {
                                    templateUUIDError ? (
                                        <FormHelperText sx={{color: '#FF0000'}}>Choose one!</FormHelperText>
                                    ) : (
                                        <></>
                                    )
                                }
                            </FormControl>
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions className='btn-action'>
                    <Button
                        onClick={previewMail}
                        className='preview'>
                        Preview
                    </Button>
                    <Button onClick={sendMail} className='send'>Send</Button>
                </DialogActions>
            </Dialog>

            <PreviewReserveMail open={menu.preview} templateUUID={templateUUID} handleClose={(forced) => {
                if (forced) {
                    resetMenu()
                    handleClose()
                } else {
                    openMenu('send')
                }
            }}/>
        </Box>
    );
}
