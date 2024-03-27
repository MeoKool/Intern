import { Box, CircularProgress } from "@mui/material"

export default function LoadingProp() {
    return (
        <Box sx={{
            width: '100%',
            marginTop: '30px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <CircularProgress />
            <p style={{
                fontStyle: 'italic',
                marginTop: '20px'
            }}>
                Please wait
            </p>
        </Box>
    )
}