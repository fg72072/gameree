import * as React from "react";
import {useEffect, useState} from "react";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import collectionnft from "../../../assets/images/collection-nft.png";
import {useWeb3React} from "@web3-react/core";
import {Moralis, Web3API} from "moralis";
import {IconButton, TextField} from "@mui/material";
import {Search} from "@material-ui/icons";
import {NFT_addr} from "../../../contract/addresses";
import {ethers} from "ethers";
import ABI from "../../../contract/GameRee1155.json";
import Web3Modal from "web3modal";

const mdTheme = createTheme({
    background: {
        default: "#fff",
    },
});

function MyCollection(props) {

    const [_NFTs, setNFTs] = useState([]);
    const {account} = useWeb3React();
    const [address, setAddress] = useState('');
    const ids = ['57896044618658097711785492504343953927315557066662158946655541218820101242881', '57896044618658097711785492504343953927315557066662158946655541218820101242882', '57896044618658097711785492504343953927315557066662158946655541218820101242883']
    const names = {
        ['57896044618658097711785492504343953927315557066662158946655541218820101242881']: 'PLUTON',
        ['57896044618658097711785492504343953927315557066662158946655541218820101242882']: 'MA ARCADE',
        ['57896044618658097711785492504343953927315557066662158946655541218820101242883']: 'MA ARCADE',
    }


    const loadProvider = async () => {
        try {
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            return provider.getSigner();
        } catch (e) {
            console.log("loadProvider: ", e)

        }
    }

    useEffect(() => {
        (async () => {
            try {
                await Moralis.start({
                    appId: 'kHfSntBY6Lu5iWCCPF4HaHCf6PDTXxuYbiEq9YBx',
                    serverUrl: 'https://lyd7qxufgy7q.usemoralis.com:2053/server'
                });
                if (!account) return
                let signer = await loadProvider()
                let NFTCrowdsaleContract = new ethers.Contract(NFT_addr, ABI, signer);
                const response = await Web3API.account.getNFTs({
                    address: account,
                    token_address: NFT_addr,
                    chain: '0x61'
                });
                console.log(response.result, NFT_addr)
                const userNFTs = response?.result.reduce((arr, nft) => {
                    if (nft.token_address.toLowerCase() == NFT_addr.toLowerCase()) {
                        arr.push(nft);
                    }
                    return arr;
                }, [])
                console.log(userNFTs)
                // let uri = await NFTCrowdsaleContract.uri(ids.filter(id => id === (userNFTs.token_id).toString()))
                // console.log(uri)

                // let response1 = await fetch(uri, {method: 'GET'})
                // const data = await response1.json();

                setNFTs(userNFTs);
            } catch (e) {
                console.log(e);
            }
        })()
    }, [account]);

    const handleSearch = async () => {
        const response = await Web3API.account.getNFTs({address: address});
        const userNFTs = response?.result
        setNFTs(userNFTs);
    }


    return (
        <ThemeProvider theme={mdTheme} className="dashboard" backgroundColor>
            <Box sx={{display: "flex", backgroundColor: "#FFF"}} className="dashboard">
                <CssBaseline/>
                {
                    props.sidebar
                }
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === "light"
                                ? theme.palette.grey[0]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: "100vh",
                        overflow: "auto",
                    }}
                >
                    {/* <Toolbar /> */}

                    {
                        props.header
                    }
                    <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
                        <Grid container sx={{mt: 4, mb: 4}}>
                            <Grid item xs={12}>
                                <div className="content d-flex justify-content-between">
                                    <div className="heading">
                                        <h3>Collections</h3>
                                    </div>
                                    <div>
                                        <TextField id={'address'} placeholder='Search users NFTs'
                                                   onChange={e => setAddress(e.target.value)} variant='standard'
                                                   margin='dense' color={"secondary"} sx={{color: '#FFF'}}
                                                   InputProps={{
                                                       endAdornment: (
                                                           <IconButton onClick={handleSearch} sx={{ color: '#FFF' }}><Search/></IconButton>)
                                                   }}
                                        />
                                    </div>
                                </div>
                            </Grid>

                        </Grid>
                        <Grid container spacing={3}>
                            {/* small boxes */}
                            {
                                _NFTs.length > 0 && _NFTs.map(nft => {
                                    return Object.entries(names).map(([key, value]) => {
                                        console.log('KEY -> ',key);
                                        console.log('VALUE -> ',value);

                                        if(key === nft.token_id) {
                                            return  <Grid item xs={3} md={3} lg={3}>
                                                <div className="sell-box-layer-1">
                                                    <div className="sell-box-layer-2">
                                                        <div className="sell-box">
                                                            <img src={collectionnft} className="nft-img"/>
                                                        </div>
                                                        <div className="sell-box-body">
                                                            <h3>{value}</h3>
                                                            {/*<h4>291B Oxford St, W1C 2DT, UK</h4>*/}
                                                        </div>
                                                        {/*<div className="buttons mainside nft-footer w-100 mt-2">*/}
                                                        {/*    <a className="d-block custom-mt-1">My Collection</a>*/}
                                                        {/*</div>*/}
                                                    </div>
                                                </div>
                                            </Grid>
                                        }

                                        return <></>
                                    })
                                })
                            }
                            {/* Chart */}
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default MyCollection