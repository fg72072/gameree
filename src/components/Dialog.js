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

import React, {useCallback, useEffect, useState} from 'react'

import {forwardRef} from 'react'
import {AccountCircle, Send} from "@material-ui/icons";
import {ContentCopy} from "@mui/icons-material";

import ABI from '../contract/GameRee1155.json'
import {NFT_addr} from '../contract/addresses'

import { useWeb3React } from "@web3-react/core";

import { ethers } from "ethers";
import Web3Modal from 'web3modal'


const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CustomDialog = ({toggleModal, status, data, loading }) => {

    // console.log("DIALOG", data)
    const [to , setTo] = useState('')

    const {
        connector,
        library,
        account,
        chainId,
        activate,
        deactivate,
        active,
        errorWeb3Modal
    } = useWeb3React();
    
    if(!data) return <></>;

    const ids = ['57896044618658097711785492504343953927315557066662158946655541218820101242881','57896044618658097711785492504343953927315557066662158946655541218820101242882','57896044618658097711785492504343953927315557066662158946655541218820101242883']

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
    const roadName = data?.['road name'] || '';
    const streetName = data?.['street name'];
    const id = data?.['id'];
    const _account =data?.['account']
  

    const buildingArea = '1' ||buildingData?.place_name.split(',')[1] + buildingData?.place_name.split(',')[2];
    const buildingType = '2' || buildingData?.properties?.category
    const detailInfo =  '3' || buildingData?.place_name.split(',')[3] + buildingData?.place_name.split(',')[4]

    const copyAddressHandler = (text) => navigator.clipboard.writeText(text)

    const handleTransfer =async () => {
        alert('Transfer Data');
        
    }

    const loadProvider = async () => {
        try {
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            return provider.getSigner();
        }
        catch (e) {
            console.log("loadProvider: ", e)
            
        }
      }

    const transfer =
        async () => {
            try {

                let signer = await loadProvider()
                let NFTCrowdsaleContract = new ethers.Contract(NFT_addr, ABI, signer);
                const account = await signer.getAddress()
                console.log(account, to, id)
                let tx = await NFTCrowdsaleContract.safeTransferFrom(account, to, ids[Number(id)
 - 1], 1, [])
                tx = await tx.wait()
            } catch (e) {
                console.error("data", e)
            }
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
                    {
                        _account === owner ?
                    
                    <Grid item container>
                        <Grid item xs>
                            <TextField
                                id='walletAddress'
                                label='Transferred To'
                                variant='outlined'
                                onChange={(e)=>setTo(e.target.value)}
                                fullWidth
                                InputProps={{
                                    endAdornment: <Tooltip title='Send' arrow>
                                        <IconButton onClick={transfer}>
                                            <Send/>
                                        </IconButton>
                                    </Tooltip>
                                }}
                            />
                        </Grid>
                    </Grid>
:null}

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