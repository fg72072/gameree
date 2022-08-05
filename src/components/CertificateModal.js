import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid } from '@mui/material';
import collectionnft from "../assets/images/collection-nft.png";

export default function CertificateModal() {
  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div >
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={'md'}
        maxWidth={'md'}
        className='certificate-modal'>
        <DialogTitle id="alert-dialog-title">
          {"Property Certificate"}
        </DialogTitle>
        <DialogContent>
        <Grid container spacing={3}>
            <Grid item xs={4} md={4} lg={4}>
                <img src={collectionnft} className="building-img"/>
            </Grid>
            <Grid item xs={8} md={8} lg={8}>
                <ul className='building-detail'>
                    <li>
                        <p>
                            Owner Name :
                        </p>
                        <span>
                            Gameree
                        </span>
                    </li>
                    <li>
                        <p>
                            Building Name :
                        </p>
                        <span>
                        W1 Curates, Art Gallery, Oxford Street, London, UK
                        </span>
                    </li>
                    <li>
                        <p>
                            Building Number :
                        </p>
                        <span>
                            1
                        </span>
                    </li>
                    <li>
                        <p>
                            Road Name :
                        </p>
                        <span>
                            Gameree
                        </span>
                    </li>
                    <li>
                        <p>
                            City :
                        </p>
                        <span>
                            Gameree
                        </span>
                    </li>
                    <li>
                        <p>
                            Street Name :
                        </p>
                        <span>
                            Gameree
                        </span>
                    </li>
                    <li>
                        <p>
                        No of Units :
                        </p>
                        <span>
                            1
                        </span>
                    </li>
                    <li>
                        <p>
                        No of Total gross area in sqt of building Units :
                        </p>
                        <span>
                        1
                        </span>
                    </li>
                    <li>
                        <p>
                        Price in sq in £ :
                        </p>
                        <span>
                            3
                        </span>
                    </li>
                    <li>
                        <p>
                        Current Price in £ :
                        </p>
                        <span>
                            3
                        </span>
                    </li>
                    <li>
                        <p>
                        Current NFT Price :
                        </p>
                        <span>
                            3
                        </span>
                    </li>
                </ul>
            </Grid>
        </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}