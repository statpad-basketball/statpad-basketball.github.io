import styles from "./LandingPage.module.css";
import {Link} from "react-router-dom";
import React from "react";

const LandingPage = () => {
    return (
        <div className={styles.landingPageDiv}>
            <img
                className={styles.backgroundCircleIcon}
                alt=""
                src="/statpad.github.io/background-circle.svg"
            />
            <img
                className={styles.graphPaperDots}
                alt=""
                src="/statpad.github.io/graph-paper-dots.svg"
            />
            <img className={styles.blobIcon} alt="" src="/statpad.github.io/blob.svg"/>
            <img className={styles.basketballIcon} alt="" src="/statpad.github.io/basketball.svg"/>
            <img className={styles.ellipseIcon} alt="" src="/statpad.github.io/ellipse-3.svg"/>
            <img className={styles.ellipseIcon1} alt="" src="/statpad.github.io/ellipse-5.svg"/>
            <img className={styles.ellipseIcon2} alt="" src="/statpad.github.io/ellipse-5.svg"/>
            <b className={styles.quantifyingHoopsB}>
                <p className={styles.quantifyingP}>Quantifying</p>
                <p className={styles.hoops}>Hoops.</p>
            </b>
            <img className={styles.arrowIcon} alt="" src="/statpad.github.io/arrow-1.svg"/>
            <img className={styles.arrowIcon1} alt="" src="/statpad.github.io/arrow-5.svg"/>
            <img className={styles.arrowIcon2} alt="" src="/statpad.github.io/arrow-6.svg"/>
            <img className={styles.arrowIcon3} alt="" src="/statpad.github.io/arrow-3.svg"/>
            <img className={styles.arrowIcon4} alt="" src="/statpad.github.io/arrow-4.svg"/>
            <img className={styles.arrowIcon5} alt="" src="/statpad.github.io/arrow-2.svg"/>
            <img className={styles.arrowIcon6} alt="" src="/statpad.github.io/arrow-8.svg"/>
            <img className={styles.arrowIcon7} alt="" src="/statpad.github.io/arrow-7.svg"/>
            <img className={styles.giannisIcon} alt="" src="/statpad.github.io/giannis.svg"/>
            <img className={styles.groupIcon} alt="" src="/statpad.github.io/klay.svg"/>
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
