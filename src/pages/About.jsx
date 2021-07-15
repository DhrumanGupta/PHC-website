import React from 'react';
import styles from '../stylesheets/About.module.css';
import ProgressiveImage from "react-progressive-image";
import logo from '../images/common/psn.jpg';
import tinyLogo from '../images/common/tiny/psn.jpg';

function About(props) {
	return (
		<div className={`container ${styles.container}`}>
			{/*<img alt={"Logo"} src={".."} className={styles.logo}/>*/}
			<ProgressiveImage src={logo} placeholder={tinyLogo}>
				{src => <img alt={"Logo"} src={src} className={styles.logo}/>}
			</ProgressiveImage>
			<h1 className={"header text-center"}>
				About us
			</h1>
			<p className={styles.heading}>
				Welcome to PSN Hack Club!
			</p>
			<p className={styles.text}>
				PSN Hack Club is a club under the global Hack Club network at Pathways School Noida. We're 
				a welcoming community of programmers, developers and tech enthusiasts supporting each other on our
				own journeys deeper into our respective fields. 
			</p>
		</div>
	);
}

export default About;
