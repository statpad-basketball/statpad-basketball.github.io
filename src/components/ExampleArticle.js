import {Flex, Heading, Text, Image} from '@chakra-ui/react'

import ArticlePart from './ArticlePart'
import styles from "./Article.module.css";
import React from "react";

const ExampleArticle = () => {
    return (
        <Flex p="10" flexDir="column">
            <Heading className={styles.articleHeader} fontSize="5xl">Blakes' breakout game not enough for Duke men's basketball in stumble at Wake Forest</Heading>
            <Image className={styles.headerImage} src="/statpad.github.io/jaylen.svg"/>
            <Text className={styles.headerImageCaption}>Jaylen Blakes posted a career-high 17 points off the bench in Duke's loss at Wake Forest. </Text>
            <Text className={styles.byLine}>By Jonathan Levitan</Text>
            <Text className={styles.dateLine}>December 21, 2022 at 10:07am CST</Text>
            <Text className={styles.textBlob1}>
                There’s no reason to avoid the point: Tuesday’s loss was an ugly one for the Blue Devils, who were outclassed by Wake Forest in their trip to Winston-Salem, N.C.
                <br/>
                <br/>

                Down two key rotation players in freshmen Dereck Lively II and Dariq Whitehead, No. 14 Duke fell behind early and could never quite claw all the way back against the Demon Deacons. Commendable outings, some borderline second-half heroics and a combined 31 points from the pairing of Jaylen Blakes and Mark Mitchell kept the visitors within striking distance until late in the game, but it was never the Blue Devils’ night. Wake Forest came out on top 81-70, handing head coach Jon Scheyer’s squad its first ACC loss in its first true road game.
                <br/>
                <br/>

                The ever-so-slightly bright side for Duke is that one-sided losses are typically telling. Tuesday’s struggles can only help the Blue Devils as they plunge forward into ACC play, even if the loss is sure to leave a bad taste in their mouths heading into an 11-day hiatus.
                <br/>
                <br/>

                "I think all this helps. Being in this environment, playing shorthanded," Scheyer said after the game. "... You have to keep perspective, but you also have to hate the result. That’s part of what makes you a competitor, whether it’s as a coach or as a player.
                <br/>
                <br/>

                "And so for us, I think it’s important understanding the room we have to grow, and we just have to keep going, and also we need to address the things that we need to cut out now, because there’s a sense of urgency. In the ACC, you have to win these games."
                <br/>
                <br/>

                Despite the final result, Blakes was a revelation Tuesday, shattering his previous career-best of nine points with a team-high 17 points on 6-of-7 shooting. The sophomore guard connected on 3-of-4 triples, two of which came in succession just past the midway point of the second half.
                <br/>
                <br/>

                With the Demon Deacons up 60-49 and threatening to pull away for good, Blakes scored the next 10 Blue Devil points, going deep into his bag for a crafty up-and-under finish at the hoop to cap the personal flurry. Still, as the clock ticked past four minutes remaining, Duke trailed 68-59; Wake Forest had averted the Blue Devils’ last of many runs, as it had ever since taking the early advantage.
                <br/>
                <br/>

                "They got in the bonus pretty quickly in the second half. I felt like we were cutting the lead down to seven, eight, nine and they were getting to the line," graduate center Ryan Young said. "I think [Wake Forest guard Tyree Appleby] shot 14 free throws. And that’s a killer, when they get quick, easy ones … it’s hard to dig yourself out of a hole like that, we put ourselves into in the first half, beginning of the second, and it’s tough to come back from that."
                <br/>
                <br/>
                Appleby, who led Wake Forest with 18 points, went 13-of-14 from the charity stripe, attempting as many free throws himself as the Blue Devils did together. As a team, the Demon Deacons had the most makes (22) and attempts (26) by any of Duke’s opponents so far.
                <br/>
                <br/>
                For as downright astonishing as Blakes was in the guts of the game, he played his part in Wake Forest’s parade to the stripe, eventually fouling out with under a minute to play. Scheyer elected to let the sophomore stay in the game after picking up his fourth foul with 6:32 on the clock, presumably because he had no choice but to keep the sudden engine of Duke’s offense on the floor.
                <br/>
                <br/>
            </Text>
            <Image className={styles.secondImage} src="/statpad.github.io/jaylen.svg"/>
            <Text className={styles.secondImageCaption}>
                Test test test
            </Text>
            <Text className={styles.textBlob2}>
                The flip side of Blakes’ upswing was a pair of down nights for leading scorer Kyle Filipowski and junior captain Jeremy Roach. Roach scored nine points Tuesday in his first game since Dec. 6 after he sat out Duke’s prior game against Maryland Eastern Shore with a lingering toe injury, while Filipowski (nine points, six rebounds) was held to single-digit scoring for the first time in his college career. The duo combined to shoot 7-of-21 from the field and committed five turnovers apiece.
                <br/>
                <br/>
                On a team without clear-cut top scoring options—something Scheyer has often noted—there is a sense that rough outings for one or two starters should not sink the entire ship. But the Blue Devils struggled to get much efficient scoring Tuesday outside of Blakes or Mitchell, showing just how indispensable Roach and Filipowski—Duke’s two most consistent scorers—are to their team’s offense.
                <br/>
                <br/>
                "I think we’re a good shooting team, but it’s not what we do first," Scheyer said. "I thought we settled a little bit early, but we also took some good shots and missed. And that's how it goes sometimes, and that's why your defense needs to be consistent. The defense for us, is where we've hung our hat on, and we didn't get back to that. That wasn't there tonight."
                <br/>
                <br/>
                Free throw disparity was not the only typical Duke strength that was turned against it Tuesday. Scheyer’s squad, short its starting center, was also outrebounded 28-22.
                On the defensive end, Duke clearly missed Lively. The 7-foot-1 freshman has not provided a great deal of offensive firepower in nine starts, but he has come to play an important role as the anchor of the Blue Devils’ defense.
                <br/>
                <br/>
                In Lively’s absence, Young stepped into the starting lineup for the first time since Nov. 15 and gave Duke a boost with 10 points and nine rebounds in a season-high 35 minutes.
                <br/>
                <br/>
                "[Lively] just being out there, changes the game," Scheyer said. "But Ryan [Young], I thought he really battled, what he did. We didn’t give him the ball enough. He basically, he almost has a double-double."
                <br/>
                <br/>
                Duke now gets another long break before meeting Florida State Dec. 31 at Cameron Indoor Stadium for its final contest of 2022. The Blue Devils will also get another shot at Wake Forest when the Demon Deacons visit Durham Jan. 31.
                <br/>
                <br/>
            </Text>

        </Flex>
    )
}

export default ExampleArticle
