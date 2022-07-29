import React, { memo, useEffect } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { settings } from './constants';
import { useSelector, useDispatch } from 'react-redux';
import * as selectors from '../../store/selectors';
import { fetchNftShowcase } from "../../store/actions/thunks";
import { navigate } from "@reach/router";
import api from "../../core/api";
import image1 from "../../assets/images/Image1.jpg"
import image2 from "../../assets/images/image2.jpg"
import image3 from "../../assets/images/image3.jpg"
import image4 from "../../assets/images/image4.jpg"
import image5 from "../../assets/images/image5.jpg"

const SliderCarouselRedux = () => {

    const dispatch = useDispatch();
    const nftsState = useSelector(selectors.nftShowcaseState);
    // const nfts = nftsState.data ? nftsState.data : [];
    const nfts = [
        {
            "id": 17,
            "title": null,
            "username": "art",
            "nft_link": "itemDetail",
            "image_url": image1,
           
            
        },
        {
            "id": 17,
            "title": null,
            "username": "art",
            "nft_link": "itemDetail",
            "image_url": image2,
           
            
        },
        {
            "id": 17,
            "title": null,
            "username": "art",
            "nft_link": "itemDetail",
            "image_url": image3,
            
            
        },
        {
            "id": 17,
            "title": null,
            "username": "art",
            "nft_link": "itemDetail",
            "image_url": image4,
            
        },
        {
            "id": 17,
            "title": null,
            "username": "art",
            "nft_link": "itemDetail",
            "image_url": image5,
           
        }
    ];
    useEffect(() => {
        dispatch(fetchNftShowcase());
    }, [dispatch]);

    const navigateTo = (link) => {
        navigate(link);
    }

    return (
        <div className='nft-big'>
          <Slider {...settings}>
          {nfts && nfts.map( (nft, index) => (
            <div onClick={() => navigateTo(nft.nft_link)} className='itm' index={index+1} key={index}>
              <div className="nft_pic">                            
                  <span>
                      <span className="nft_pic_info">
                          <span className="nft_pic_title">{nft.title}</span>
                          <span className="nft_pic_by">{nft.username}</span>
                      </span>
                  </span>
                  <div className="nft_pic_wrap">
                      <img src={nft.image_url} className="lazy img-fluid" alt=""/>
                  </div>
              </div>
            </div>
          ))}
          </Slider>
        </div>
    );
}

export default memo(SliderCarouselRedux);
