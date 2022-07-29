import React from 'react';
import Reveal from 'react-awesome-reveal';
import { keyframes } from "@emotion/react";


const fadeInUp = keyframes`
  0% {
    opacity: 0;
    -webkit-transform: translateY(40px);
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
`;

const BUsinessMeetingSlider= () => (
 <div className="container">
    <div className="row align-items-center">
          <div className="col-md-6 m-auto">
              <div className="spacer-single"></div>
              <div className="spacer-double"></div>
              <Reveal className='onStep' keyframes={fadeInUp} delay={300} duration={600}>
              <h1 className="text-center feature-box f-boxed  text-center">Business Meeting</h1>
              </Reveal>
            
              <div className="spacer-10"></div>
              <Reveal className='onStep' keyframes={fadeInUp} delay={800} duration={600}>
            
              <div className="spacer-single"></div>
              <div className="spacer-double"></div>
              </Reveal>
          </div>
      </div>
    </div>
);
export default BUsinessMeetingSlider;