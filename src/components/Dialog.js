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

    // console.log("DIALOG", data)
    if(!data) return <></>;


    const buildingData = data


    const buildingName =    data?.['Building name'] || '';
    const buildingNumber =  data?.['Building number'] || ''
    const name = data?.['name'] || '';
    const noOfUnits = data?.['No of Units'] || ''
    const totalAreaInSqt = data?.['Total gross area in sqt of building'] || '';
    const city = data?.['city'] || '';
    const currentNFT_Price = data?.['current NFT price'] || '';
    const priceInEuro = data?.['current price in £'];
    const image = data?.['image'];
    const owner = data?.['owner'] || '';
    const postCode = data?.['postcode'];
    const priceInPound = data?.['price in sq in £'];
    const roadName = data?.['road name'];
    const streetName = data?.['street name'];

    const buildingArea = '1' ||buildingData?.place_name.split(',')[1] + buildingData?.place_name.split(',')[2];
    const buildingType = '2' || buildingData?.properties?.category
    const detailInfo =  '3' || buildingData?.place_name.split(',')[3] + buildingData?.place_name.split(',')[4]

    const copyAddressHandler = (text) => navigator.clipboard.writeText(text)

    const handleTransfer = () => {
        alert('Transfer Data');
    }


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
                                value={totalAreaInSqt}
                                fullWidth
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                    </Grid>
                    <Grid item container spacing={1}>
                        <Grid item xs>
                            <TextField
                                id="buildingNumber"
                                label="Building Number"
                                variant="outlined"
                                value={buildingNumber || ' '}
                                fullWidth
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>

                        <Grid item xs>
                            <TextField
                                id="city"
                                label="City"
                                variant="outlined"
                                value={city || ''}
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
                                value={owner || ''}
                                fullWidth
                                InputProps={{
                                    endAdornment: <Tooltip title='Copy Address' arrow>
                                        <IconButton onClick={() => copyAddressHandler(owner)}>
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
                                        <IconButton onClick={handleTransfer}>
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