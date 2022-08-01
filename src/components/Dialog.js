import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    Slide,
    TextField, Tooltip
} from "@mui/material";

import {forwardRef} from 'react'
import {AccountCircle, Send} from "@material-ui/icons";
import {ContentCopy} from "@mui/icons-material";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CustomDialog = ({toggleModal, status, data, loading}) => {


    const buildingData = data?.features[0];

    const buildingName = buildingData?.place_name.split(',')[0]
    const buildingArea = buildingData?.place_name.split(',')[1] + buildingData?.place_name.split(',')[2];
    const buildingType = buildingData?.properties?.category
    const detailInfo = buildingData?.place_name.split(',')[3] + buildingData?.place_name.split(',')[4]

    const copyAddressHandler = (text) => navigator.clipboard.writeText(text)

    console.log(buildingData);

    return (
        <Dialog
            onClose={toggleModal}
            open={status}
            TransitionComponent={Transition}
        >
            <DialogTitle>Property Details</DialogTitle>
            <DialogContent>

                {loading && <Grid item container justifyContent='center'> <CircularProgress/> </Grid>}

                <Grid container sx={{py: 2}} spacing={2} direction='column'>
                    <Grid item container spacing={1}>
                        <Grid item xs>
                            <TextField
                                id="buildingName"
                                label="Building Name"
                                variant="outlined"
                                value={buildingName || ' '}
                                fullWidth

                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                        <Grid item xs>
                            <TextField
                                id="buildingArea"
                                label="Building Area"
                                variant="outlined"
                                value={buildingArea}
                                fullWidth
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                    </Grid>
                    <Grid item container spacing={1}>
                        <Grid item xs>
                            <TextField
                                id="buildingType"
                                label="Building Type"
                                variant="outlined"
                                value={buildingType || ' '}
                                fullWidth
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>

                        <Grid item xs>
                            <TextField
                                id="details"
                                label="Country"
                                variant="outlined"
                                value={detailInfo}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <Grid item container>
                        <Grid item xs>
                            <TextField
                                id='ownerWalletAddress'
                                label='Owner Wallet Address'
                                variant='outlined'
                                value={'0x3b9bA781797b57872687Ce5d5219A1A4Bc0e85ea'}
                                fullWidth
                                InputProps={{
                                    endAdornment: <Tooltip title='Copy Address' arrow>
                                        <IconButton onClick={() => copyAddressHandler('Junaid')}>
                                            <ContentCopy/>
                                        </IconButton>
                                    </Tooltip>
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Grid item container>
                        <Grid item xs>
                            <TextField
                                id='walletAddress'
                                label='Transferred To'
                                variant='outlined'
                                fullWidth
                                InputProps={{
                                    endAdornment: <Tooltip title='Send' arrow>
                                        <IconButton>
                                            <Send/>
                                        </IconButton>
                                    </Tooltip>
                                }}
                            />
                        </Grid>
                    </Grid>

                </Grid>
            </DialogContent>
            <DialogActions>
                {/*<Button variant='outlined' color='primary'>*/}
                {/*    Owner Details*/}
                {/*</Button>*/}
                <Button variant='outlined' color='error' autoFocus onClick={toggleModal}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default CustomDialog