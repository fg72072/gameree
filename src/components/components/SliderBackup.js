import React, { memo, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { settings } from "./constants";
import { useSelector, useDispatch } from "react-redux";
import * as selectors from "../../store/selectors";
import { fetchNftShowcase } from "../../store/actions/thunks";
import { navigate } from "@reach/router";
import api from "../../core/api";
import image from "../../Design1.jpg";
import image2 from "../../Design2.jpg";
import image3 from "../../Design03.jpg";
import image4 from "../../Design04.jpg";
import image5 from "../../Design05.jpg";
import image6 from "../../Design06.jpg";
import image7 from "../../Design07.jpg";
import image8 from "../../Design08.jpg";

const SliderCarouselRedux = () => {
  const dispatch = useDispatch();
  const nftsState = useSelector(selectors.nftShowcaseState);
  const nfts = nftsState.data
    ? nftsState.data
    : [
        {
          id: 8,
          unique_id: null,
          category: "collectibles",
          status: "buy_now",
          item_type: "bundles",
          collections: "cartoonism",
          deadline: null,
          author_link: "/Author",
          nft_link: "/ItemDetail",
          bid_link: "/ItemDetail",
          title: "Loop Donut",
          price: 0.08,
          bid: 1,
          max_bid: 20,
          likes: 50,
          description:
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
          views: 100,
          priceover: null,
          author: {
            id: 4,
            username: "Lori Hart",
            social: "@lori_hart",
            wallet:
              "DdzFFzCqrhshMSxb9oW3mRo4MJrQkusV3fGFSTwaiu4wPBqMryA9DYVJCkW9n7twCffG5f5wX2sSkoDXGiZB1HPa7K7f865Kk4LqnrME",
            followers: 322,
            bid: 1,
            author_sale: 4,
            about:
              "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni",
            users_permissions_user: null,
            published_at: "2021-11-04T13:51:31.671Z",
            created_at: "2021-11-04T13:51:29.459Z",
            updated_at: "2021-11-30T15:41:59.490Z",
          },
          showcase: true,
          audio_url: null,
          published_at: "2021-11-04T18:58:59.456Z",
          created_at: "2021-11-04T18:58:56.792Z",
          updated_at: "2022-01-27T15:10:51.268Z",
          preview_image: {
            id: 13,
            name: "anim-5.webp",
            alternativeText: "",
            caption: "",
            width: 200,
            height: 200,
            formats: {
              thumbnail: {
                name: "thumbnail_anim-5.webp",
                hash: "thumbnail_anim_5_ec9190202f",
                ext: ".webp",
                mime: "image/webp",
                width: 156,
                height: 156,
                size: 7.38,
                path: null,
                url: "/uploads/thumbnail_anim_5_ec9190202f.webp",
              },
            },
            hash: "anim_5_ec9190202f",
            ext: ".webp",
            mime: "image/webp",
            size: 358.51,
            url: "/uploads/anim_5_ec9190202f.webp",
            previewUrl: null,
            provider: "local",
            provider_metadata: null,
            created_at: "2021-11-02T15:12:43.552Z",
            updated_at: "2021-11-06T15:03:26.853Z",
          },
        },
        {
          id: 14,
          unique_id: null,
          category: "collectibles",
          status: "on_auction",
          item_type: "single_items",
          collections: "cartoonism",
          deadline: "2022-01-10",
          author_link: "/Author",
          nft_link: "/ItemDetail",
          bid_link: "/ItemDetail",
          title: "I Believe I Can Fly",
          price: 0.08,
          bid: 1,
          max_bid: 20,
          likes: 50,
          description:
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
          views: 240,
          priceover: null,
          author: {
            id: 12,
            username: "Fred Ryan",
            social: "@fred_ryan",
            wallet:
              "DdzFFzCqrhshMSxb9oW3mRo4MJrQkusV3fGFSTwaiu4wPBqMryA9DYVJCkW9n7twCffG5f5wX2sSkoDXGiZB1HPa7K7f865Kk4LqnrME",
            followers: 781,
            bid: null,
            author_sale: 12,
            about:
              "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni",
            users_permissions_user: null,
            published_at: "2021-11-04T14:02:10.231Z",
            created_at: "2021-11-04T14:02:06.507Z",
            updated_at: "2021-11-30T15:41:34.871Z",
          },
          showcase: true,
          audio_url: null,
          published_at: "2021-11-04T19:08:32.990Z",
          created_at: "2021-11-04T19:08:30.033Z",
          updated_at: "2021-11-30T15:41:34.852Z",
          preview_image: {
            id: 16,
            name: "anim-8.webp",
            alternativeText: "",
            caption: "",
            width: 200,
            height: 200,
            formats: {
              thumbnail: {
                name: "thumbnail_anim-8.webp",
                hash: "thumbnail_anim_8_3b95944cfb",
                ext: ".webp",
                mime: "image/webp",
                width: 156,
                height: 156,
                size: 3.03,
                path: null,
                url: "/uploads/thumbnail_anim_8_3b95944cfb.webp",
              },
            },
            hash: "anim_8_3b95944cfb",
            ext: ".webp",
            mime: "image/webp",
            size: 18.55,
            url: "/uploads/anim_8_3b95944cfb.webp",
            previewUrl: null,
            provider: "local",
            provider_metadata: null,
            created_at: "2021-11-02T15:12:44.001Z",
            updated_at: "2021-11-06T15:04:49.926Z",
          },
        },
        {
          id: 15,
          unique_id: null,
          category: "art",
          status: "buy_now",
          item_type: "single_items",
          collections: "abstraction",
          deadline: null,
          author_link: "/Author",
          nft_link: "/ItemDetail",
          bid_link: "/ItemDetail",
          title: "Live Arts",
          price: 3.99,
          bid: null,
          max_bid: null,
          likes: 286,
          description:
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
          views: 1000,
          priceover: null,
          author: {
            id: 3,
            username: "Nicholas Daniels",
            social: "@nicholas_daniels",
            wallet:
              "DdzFFzCqrhshMSxb9oW3mRo4MJrQkusV3fGFSTwaiu4wPBqMryA9DYVJCkW9n7twCffG5f5wX2sSkoDXGiZB1HPa7K7f865Kk4LqnrME",
            followers: 291,
            bid: 2,
            author_sale: 3,
            about:
              "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni",
            users_permissions_user: null,
            published_at: "2021-11-04T13:50:28.703Z",
            created_at: "2021-11-04T13:50:26.184Z",
            updated_at: "2021-11-30T15:42:16.497Z",
          },
          showcase: true,
          audio_url: null,
          published_at: "2021-11-06T20:57:07.008Z",
          created_at: "2021-11-06T20:56:58.958Z",
          updated_at: "2021-11-30T15:42:16.397Z",
          preview_image: {
            id: 57,
            name: "crs-5.jpg",
            alternativeText: "",
            caption: "",
            width: 1000,
            height: 1000,
            formats: {
              thumbnail: {
                name: "thumbnail_crs-5.jpg",
                hash: "thumbnail_crs_5_86f0d779bb",
                ext: ".jpg",
                mime: "image/jpeg",
                width: 156,
                height: 156,
                size: 4.99,
                path: null,
                url: "/uploads/thumbnail_crs_5_86f0d779bb.jpg",
              },
              medium: {
                name: "medium_crs-5.jpg",
                hash: "medium_crs_5_86f0d779bb",
                ext: ".jpg",
                mime: "image/jpeg",
                width: 750,
                height: 750,
                size: 84.59,
                path: null,
                url: "/uploads/medium_crs_5_86f0d779bb.jpg",
              },
              small: {
                name: "small_crs-5.jpg",
                hash: "small_crs_5_86f0d779bb",
                ext: ".jpg",
                mime: "image/jpeg",
                width: 500,
                height: 500,
                size: 38.71,
                path: null,
                url: "/uploads/small_crs_5_86f0d779bb.jpg",
              },
            },
            hash: "crs_5_86f0d779bb",
            ext: ".jpg",
            mime: "image/jpeg",
            size: 145.04,
            url: "/uploads/crs_5_86f0d779bb.jpg",
            previewUrl: null,
            provider: "local",
            provider_metadata: null,
            created_at: "2021-11-02T15:12:54.502Z",
            updated_at: "2021-11-02T15:12:54.538Z",
          },
        },
        {
          id: 16,
          unique_id: null,
          category: "art",
          status: "buy_now",
          item_type: "single_items",
          collections: "abstraction",
          deadline: null,
          author_link: "/Author",
          nft_link: "/ItemDetail",
          bid_link: "/ItemDetail",
          title: "Red Ocean",
          price: 0.45,
          bid: null,
          max_bid: null,
          likes: 588,
          description:
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
          views: 899,
          priceover: null,
          author: {
            id: 1,
            username: "Monica Lucas",
            social: "@monicaaa",
            wallet:
              "DdzFFzCqrhshMSxb9oW3mRo4MJrQkusV3fGFSTwaiu4wPBqMryA9DYVJCkW9n7twCffG5f5wX2sSkoDXGiZB1HPa7K7f865Kk4LqnrME",
            followers: 500,
            bid: 4,
            author_sale: 1,
            about:
              "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni",
            users_permissions_user: null,
            published_at: "2021-11-02T15:20:32.637Z",
            created_at: "2021-11-02T15:20:24.426Z",
            updated_at: "2021-11-30T15:42:09.638Z",
          },
          showcase: true,
          audio_url: null,
          published_at: "2021-11-06T20:58:50.186Z",
          created_at: "2021-11-06T20:58:32.152Z",
          updated_at: "2021-11-30T15:42:09.579Z",
          preview_image: {
            id: 55,
            name: "crs-4.jpg",
            alternativeText: "",
            caption: "",
            width: 1000,
            height: 1000,
            formats: {
              thumbnail: {
                name: "thumbnail_crs-4.jpg",
                hash: "thumbnail_crs_4_697e6e1a08",
                ext: ".jpg",
                mime: "image/jpeg",
                width: 156,
                height: 156,
                size: 6.92,
                path: null,
                url: "/uploads/thumbnail_crs_4_697e6e1a08.jpg",
              },
              medium: {
                name: "medium_crs-4.jpg",
                hash: "medium_crs_4_697e6e1a08",
                ext: ".jpg",
                mime: "image/jpeg",
                width: 750,
                height: 750,
                size: 152.99,
                path: null,
                url: "/uploads/medium_crs_4_697e6e1a08.jpg",
              },
              small: {
                name: "small_crs-4.jpg",
                hash: "small_crs_4_697e6e1a08",
                ext: ".jpg",
                mime: "image/jpeg",
                width: 500,
                height: 500,
                size: 66.84,
                path: null,
                url: "/uploads/small_crs_4_697e6e1a08.jpg",
              },
            },
            hash: "crs_4_697e6e1a08",
            ext: ".jpg",
            mime: "image/jpeg",
            size: 287.36,
            url: "/uploads/crs_4_697e6e1a08.jpg",
            previewUrl: null,
            provider: "local",
            provider_metadata: null,
            created_at: "2021-11-02T15:12:53.933Z",
            updated_at: "2021-11-02T15:12:53.957Z",
          },
        },
        {
          id: 17,
          unique_id: null,
          category: "art",
          status: "buy_now",
          item_type: "single_items",
          collections: "abstraction",
          deadline: null,
          author_link: "/Author",
          nft_link: "/ItemDetail",
          bid_link: "/ItemDetail",
          title: "Hot Lava",
          price: 0.07,
          bid: null,
          max_bid: null,
          likes: 700,
          description:
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
          views: 700,
          priceover: null,
          author: {
            id: 3,
            username: "Nicholas Daniels",
            social: "@nicholas_daniels",
            wallet:
              "DdzFFzCqrhshMSxb9oW3mRo4MJrQkusV3fGFSTwaiu4wPBqMryA9DYVJCkW9n7twCffG5f5wX2sSkoDXGiZB1HPa7K7f865Kk4LqnrME",
            followers: 291,
            bid: 2,
            author_sale: 3,
            about:
              "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni",
            users_permissions_user: null,
            published_at: "2021-11-04T13:50:28.703Z",
            created_at: "2021-11-04T13:50:26.184Z",
            updated_at: "2021-11-30T15:42:16.497Z",
          },
          showcase: true,
          audio_url: null,
          published_at: "2021-11-06T21:00:10.701Z",
          created_at: "2021-11-06T21:00:01.010Z",
          updated_at: "2021-11-30T15:42:16.397Z",
          preview_image: {
            id: 54,
            name: "crs-3.jpg",
            alternativeText: "",
            caption: "",
            width: 1000,
            height: 1000,
            formats: {
              thumbnail: {
                name: "thumbnail_crs-3.jpg",
                hash: "thumbnail_crs_3_4b09f7083d",
                ext: ".jpg",
                mime: "image/jpeg",
                width: 156,
                height: 156,
                size: 5.24,
                path: null,
                url: "/uploads/thumbnail_crs_3_4b09f7083d.jpg",
              },
              medium: {
                name: "medium_crs-3.jpg",
                hash: "medium_crs_3_4b09f7083d",
                ext: ".jpg",
                mime: "image/jpeg",
                width: 750,
                height: 750,
                size: 93.61,
                path: null,
                url: "/uploads/medium_crs_3_4b09f7083d.jpg",
              },
              small: {
                name: "small_crs-3.jpg",
                hash: "small_crs_3_4b09f7083d",
                ext: ".jpg",
                mime: "image/jpeg",
                width: 500,
                height: 500,
                size: 45.04,
                path: null,
                url: "/uploads/small_crs_3_4b09f7083d.jpg",
              },
            },
            hash: "crs_3_4b09f7083d",
            ext: ".jpg",
            mime: "image/jpeg",
            size: 157.13,
            url: "/uploads/crs_3_4b09f7083d.jpg",
            previewUrl: null,
            provider: "local",
            provider_metadata: null,
            created_at: "2021-11-02T15:12:53.371Z",
            updated_at: "2021-11-02T15:12:53.392Z",
          },
        },
      ];

  useEffect(() => {
    dispatch(fetchNftShowcase());
  }, [dispatch]);

  const navigateTo = (link) => {
    navigate(link);
  };

  return (
    // console.log("nfts", nfts),
    <div className="nft-big">
      <Slider {...settings}>
        {/* {nfts && nfts.map( (nft, index) => (
            <div onClick={() => navigateTo(nft.nft_link)} className='itm' index={index+1} key={index}> */}
        <div className="nft_pic">
          <span>
            <span className="nft_pic_info">
              <span className="nft_pic_title">{"nft.title"}</span>
              <span className="nft_pic_by">{"nft.author.username"}</span>
            </span>
          </span>
          <div className="nft_pic_wrap">
            <img src={image} className="lazy img-fluid" alt="" />
          </div>
        </div>
        <div className="nft_pic">
          <span>
            <span className="nft_pic_info">
              <span className="nft_pic_title">{"nft.title"}</span>
              <span className="nft_pic_by">{"nft.author.username"}</span>
            </span>
          </span>
          <div className="nft_pic_wrap">
            <img src={image6} className="lazy img-fluid" alt="" />
          </div>
        </div>
        <div className="nft_pic">
          <span>
            <span className="nft_pic_info">
              <span className="nft_pic_title">{"nft.title"}</span>
              <span className="nft_pic_by">{"nft.author.username"}</span>
            </span>
          </span>
          <div className="nft_pic_wrap">
            <img src={image2} className="lazy img-fluid" alt="" />
          </div>
        </div>
        <div className="nft_pic">
          <span>
            <span className="nft_pic_info">
              <span className="nft_pic_title">{"nft.title"}</span>
              <span className="nft_pic_by">{"nft.author.username"}</span>
            </span>
          </span>
          <div className="nft_pic_wrap">
            <img src={image3} className="lazy img-fluid" alt="" />
          </div>
        </div>
        <div className="nft_pic">
          <span>
            <span className="nft_pic_info">
              <span className="nft_pic_title">{"nft.title"}</span>
              <span className="nft_pic_by">{"nft.author.username"}</span>
            </span>
          </span>
          <div className="nft_pic_wrap">
            <img src={image4} className="lazy img-fluid" alt="" />
          </div>
        </div>
        <div className="nft_pic">
          <span>
            <span className="nft_pic_info">
              <span className="nft_pic_title">{"nft.title"}</span>
              <span className="nft_pic_by">{"nft.author.username"}</span>
            </span>
          </span>
          <div className="nft_pic_wrap">
            <img src={image} className="lazy img-fluid" alt="" />
          </div>
        </div>
        {/* </div>
          ))} */}
      </Slider>
    </div>
  );
};

export default memo(SliderCarouselRedux);
