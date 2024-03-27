import { useState, forwardRef, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Box, Select, MenuItem, FormControl, InputLabel, TextField } from '@mui/material';
import './PreviewReserveMail.scss'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function PreviewReserveMail({ open, templateUUID, handleClose }) {

    const [template, setTemplate] = useState({
        uuid: 'aaa',
        name: 'Nhắc gửi điểm',
        user_from: {
            fullName: 'Vi Vi',
            email: 'example@gmail.com'
        },
        to: {
            type: 'All'
        },
        cc: {
            email: 'example@gmail.com'
        },
        subject: 'This is an exaple subject',
        body: '%3Cp%3ELorem%20ipsum%20dolor%20sit%20amet%2C%20consectetur%20adipiscing%20elit.%20Mauris%20pharetra%20pretium%20sapien%2C%20nec%20placerat%20tellus%20gravida%20a.%20Morbi%20nibh%20eros%2C%20ultricies%20nec%20sem%20blandit%2C%20sodales%20sodales%20elit.%20Nullam%20pulvinar%20posuere%20risus%20at%20placerat.%20Donec%20ac%20tempor%20mi%2C%20et%20eleifend%20lectus.%20Nam%20consequat%20ultrices%20lacus%2C%20quis%20vulputate%20lorem%20convallis%20at.%20Fusce%20quis%20dapibus%20augue%2C%20vel%20vestibulum%20nisl.%20Praesent%20sodales%20mattis%20odio%20vel%20imperdiet.%20Aenean%20eu%20velit%20ac%20metus%20pharetra%20dignissim.%20Morbi%20tempus%20odio%20lacus%2C%20eget%20consequat%20dolor%20mollis%20et.%20Sed%20suscipit%20tincidunt%20mauris%20at%20vestibulum.%20Pellentesque%20porta%20magna%20facilisis%20orci%20dignissim%2C%20a%20convallis%20orci%20tempus.%20Mauris%20efficitur%20rutrum%20nisi%20in%20egestas.%20Proin%20eget%20augue%20varius%20elit%20posuere%20fermentum%20vel%20ac%20arcu.%20Praesent%20luctus%20lectus%20id%20libero%20faucibus%2C%20vel%20dignissim%20eros%20egestas.%20Vivamus%20vitae%20dui%20vulputate%2C%20porttitor%20risus%20ac%2C%20blandit%20purus.%3C%2Fp%3E%0A%3Cp%3ENunc%20consectetur%20ipsum%20ut%20metus%20rhoncus%2C%20ut%20ultricies%20risus%20congue.%20Donec%20eget%20mauris%20libero.%20Duis%20in%20lobortis%20sapien.%20Nullam%20ullamcorper%20pulvinar%20mauris%2C%20sed%20tempus%20magna%20bibendum%20nec.%20Nulla%20egestas%20posuere%20sem%2C%20eget%20interdum%20nulla%20facilisis%20ac.%20Sed%20fringilla%2C%20lectus%20vel%20tristique%20condimentum%2C%20massa%20libero%20lobortis%20mi%2C%20non%20consectetur%20ligula%20massa%20vitae%20orci.%20Aliquam%20nec%20dignissim%20nisi.%20In%20vitae%20velit%20mauris.%20Suspendisse%20ut%20auctor%20purus.%20In%20rutrum%20augue%20ac%20sem%20pellentesque%2C%20et%20rutrum%20nisi%20iaculis.%20Donec%20non%20nibh%20ligula.%20Ut%20tempor%20ex%20sed%20lacus%20consectetur%2C%20quis%20commodo%20nibh%20ultrices.%20Donec%20sit%20amet%20consequat%20urna.%3C%2Fp%3E'
    })

    return (
        <Dialog
            className='send-preview-reserve-mail--dialog'
            open={open}
            TransitionComponent={Transition}
            keepMounted
            fullWidth
            onClose={() => handleClose(false)}
            aria-describedby="alert-dialog-slide-description"
            PaperProps={{ sx: { 
                borderRadius: "15px"
             } }}
             maxWidth="md"
        >
            <DialogTitle className='title'>
                <p>Email preview</p>
                <div className='btn-close'>
                    <HighlightOffIcon sx={{ width: '30px', height: '30px' }} onClick={() => handleClose(true)} />
                </div>
            </DialogTitle>
            <DialogContent className='content'>
                <Box>
                    <Box className='field'>
                        <p className='field-title'>Template name</p>
                        <p>{template.name}</p>
                    </Box>
                    <Box className='field'>
                        <p className='field-title'>From</p>
                        <p>{template.user_from.fullName} ({template.user_from.email})</p>
                    </Box>
                    <Box className='field'>
                        <p className='field-title'>To</p>
                        <p>{template.to.type}</p>
                    </Box>
                    <Box className='field'>
                        <p className='field-title'>Cc</p>
                        <p>{template.cc.email}</p>
                    </Box>
                    <Box className='field'>
                        <p className='field-title'>Subject</p>
                        <p>{template.subject}</p>
                    </Box>
                    <Box className='field field-no-align'>
                        <p className='field-title'>Body</p>
                        <div dangerouslySetInnerHTML={{ __html: decodeURIComponent(template.body) }}></div>
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions className='btn-action'>
                <Button onClick={() => handleClose(false)} className='preview'>Back</Button>
                <Button onClick={() => handleClose(true)} className='send'>Send</Button>
            </DialogActions>
        </Dialog>
    );
}
