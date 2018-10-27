import React, { Component } from 'react';
import './footer.css';
import { library, findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';
library.add(fab);
const facebook = findIconDefinition({ prefix: 'fab', iconName: 'facebook', size:'fa-10x' })
const tawitter = findIconDefinition({ prefix: 'fab', iconName: 'twitter' })
const insta = findIconDefinition({ prefix: 'fab', iconName: 'instagram' })
class Footer extends Component {
  render() {
    return (
     <div className='footer'>
        <FontAwesomeIcon icon={facebook} size='3x' />
        <FontAwesomeIcon icon={tawitter} size='3x'/>
       <FontAwesomeIcon icon={insta} size='3x'/>
       <h3>@Copyright IMDB.inc</h3>
     </div>
     
    );
  }
}

export default Footer;