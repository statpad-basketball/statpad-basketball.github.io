import styles from "./LandingPage.module.css";
import {Link} from "react-router-dom";
import React from "react";

const LandingPage = () => {
    return (
        <div className={styles.landingPageDiv}>
            <img className={styles.graphPaperDots} alt="" src="graph-paper-dots.svg"/>
            <img className={styles.blobIcon} alt="" src="landingpageblob.svg"/>
            <img className={styles.arrows} alt="" src="Arrows.svg"/>
            <b className={styles.quantifyingHoopsB}>
                <p className={styles.quantifyingP}>Quantifying</p>
                <p className={styles.hoops}>Hoops.</p>
            </b>
            <Link to="/projects">
                <button className={styles.workButton}>
                    <button className={styles.rectangleButton}/>
                    <b className={styles.seeOurWork} to="/projects">See Our Work</b>
                </button>
            </Link>
        </div>
    );
};

export default LandingPage;
