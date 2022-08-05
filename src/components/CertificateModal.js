import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {CircularProgress, Grid} from '@mui/material';
import collectionnft from "../assets/images/collection-nft.png";
import Web3Modal from "web3modal";
import {ethers} from "ethers";
import {NFT_addr , gBPG_addr} from "../contract/addresses";
import ABI from "../contract/GameRee1155.json";
import TokenABI from "../contract/GBPG.json";
import truncateEthAddress from "../helpers/truncateWalletAddress";
import {useState} from "react";

import { useWeb3React } from "@web3-react/core";



export default function CertificateModal({
                                             btnText = 'MINT',
                                             toggleModal,
                                             title = 'Property Certificate',
                                             status,
                                             data,
                                             loading
                                         }) {



    return (
        <div>
            <Dialog
                open={status}
                onClose={toggleModal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth={'md'}
                maxWidth={'md'}
                className='certificate-modal'>
                <DialogTitle id="alert-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    {loading && <Grid item container justifyContent='center'> <CircularProgress/> </Grid>}
                    <Grid container spacing={3}>
                        <Grid item xs={4} md={4} lg={4}>
                            <img src={collectionnft} className="building-img"/>
                        </Grid>
                        <Grid item xs={8} md={8} lg={8}>
                            <ul className='building-detail'>
                                <li>
                                    <p> Owner Name : </p>
                                    <span> {truncateEthAddress(owner)}</span>
                                </li>
                                <li>
                                    <p> Building Name : </p>
                                    <span> {buildingName} </span>
                                </li>
                                <li>
                                    <p> Building Number : </p>
                                    <span> {buildingNumber} </span>
                                </li>
                                <li>
                                    <p> Road Name : </p>
                                    <span> {roadName} </span>
                                </li>
                                <li>
                                    <p> City : </p>
                                    <span> {city} </span>
                                </li>
                                <li>
                                    <p> Street Name : </p>
                                    <span> {streetName} </span>
                                </li>
                                <li>
                                    <p> No of Units : </p>
                                    <span> {noOfUnits} </span>
                                </li>
                                <li>
                                    <p> No of Total gross area in sqt of building Units : </p>
                                    <span> {totalAreaInSqt} </span>
                                </li>
                                <li>
                                    <p> Price in sq in £ : </p>
                                    <span> {priceInPound} </span>
                                </li>
                                <li>
                                    <p> Current Price in £ : </p>
                                    <span> {priceInEuro} </span>
                                </li>
                                <li>
                                    <p> current NFT Price : </p>
                                    <span> 500 GBPG </span>
                                </li>
                            </ul>
                        </Grid>
                        <Grid item container alignItems='center' flexDirection='column'>
                            <Grid item className='mainside'> <a href='#' onClick={onClickHandler}> {btnText} </a></Grid>
                            <Grid item sx={{ mt: 2 }}> <h6 style={{ color: 'red' }}>some error has occurred</h6> </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </div>
    );
}