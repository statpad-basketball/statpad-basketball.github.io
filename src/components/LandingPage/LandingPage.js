import styles from "./LandingPage.module.css";
import {Link} from "react-router-dom";
import React from "react";

const LandingPage = () => {
    return (
        <div className={styles.landingPageDiv}>
            <img
                className={styles.backgroundCircleIcon}
                alt=""
                src="background-circle.svg"
            />
            <img
                className={styles.graphPaperDots}
                alt=""
                src="graph-paper-dots.svg"
            />
            <img className={styles.blobIcon} alt="" src="blob.svg"/>
            <img className={styles.basketballIcon} alt="" src="basketball.svg"/>
            <img className={styles.ellipseIcon} alt="" src="ellipse-3.svg"/>
            <img className={styles.ellipseIcon1} alt="" src="ellipse-5.svg"/>
            <img className={styles.ellipseIcon2} alt="" src="ellipse-5.svg"/>
            <b className={styles.quantifyingHoopsB}>
                <p className={styles.quantifyingP}>Quantifying</p>
                <p className={styles.hoops}>Hoops.</p>
            </b>
            <img className={styles.arrowIcon} alt="" src="arrow-1.svg"/>
            <img className={styles.arrowIcon1} alt="" src="arrow-5.svg"/>
            <img className={styles.arrowIcon2} alt="" src="arrow-6.svg"/>
            <img className={styles.arrowIcon3} alt="" src="arrow-3.svg"/>
            <img className={styles.arrowIcon4} alt="" src="arrow-4.svg"/>
            <img className={styles.arrowIcon5} alt="" src="arrow-2.svg"/>
            <img className={styles.arrowIcon6} alt="" src="arrow-8.svg"/>
            <img className={styles.arrowIcon7} alt="" src="arrow-7.svg"/>
            <img className={styles.giannisIcon} alt="" src="giannis.svg"/>
            <img className={styles.groupIcon} alt="" src="klay.svg"/>
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
