import React, { useState, useEffect } from "react"
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import moment from "moment";
import styles from "./styles.module.css"
import CesinhaImg from "./assets/cesinha.jpg"
import CesinhaBraboImg from "./assets/cesinhabrabo.jpg"
import CesinhaAudio from "./assets/cesinhaaudio.mp3"
import SextouAudio from "./assets/sextouaudio.mp3"

function App() {
  const { width, height } = useWindowSize()

  const date = {
    todayDate: moment(moment().format("YYYY-MM-DD h:m")).locale("pt-br"),
    nextFriday: moment(moment().day("Friday").format("YYYY-MM-DD 18:00")).locale("pt-br")
  }

  const [angryCesinhaAudio, setCesinhaAudio] = useState(new Audio(CesinhaAudio))
  const [sextouAudio, setSextouAudio] = useState(new Audio(SextouAudio))

  const time = date.nextFriday - date.todayDate

  const [remainingDays, setRemainingDays] = useState(moment.duration(time).days())
  const [remainingHours, setRemainingHours] = useState(moment.duration(time).hours())
  const [remainingMinutes, setRemainingMinutes] = useState(moment.duration(time).minutes())

  
  useEffect(() => {
    if(remainingDays >  0 && remainingHours > 0 && remainingMinutes > 0) {
      angryCesinhaAudio.play()
    }
    if(remainingDays <= 0 && remainingHours <= 0 && remainingMinutes <= 0) {
      sextouAudio.play()
    }
  }, [])

  return (
    <div className={styles.middleContainer}>
      <nav>
        {
          (remainingDays <=  0 && remainingHours <= 0 && remainingMinutes <= 0) ?
          <h1>SEXTOU CESINHA!</h1>
          :
          <h1 style={{color: "mediumblue", textDecoration: "underline"}} onClick={() => angryCesinhaAudio.play()}>Calma cesinha!</h1>

        }
        {
          (remainingDays >  0 && remainingHours > 0 && remainingMinutes > 0) ?
          <img src={CesinhaImg} draggable={false} className={styles.clickable} onClick={() => angryCesinhaAudio.play()}/>
          :
          <img src={CesinhaBraboImg} draggable={false} />
        }
      </nav>
      <section className={styles.flex}>
        <audio autoPlay={true}>
          <source src={CesinhaAudio} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio> 
        {
          (remainingDays >  0 && remainingHours > 0 && remainingMinutes > 0) ?
          <h1>Ainda falta</h1>
          :
          <h1>Aproveita!</h1>
        }
        <section className={styles.countdownContainer}>
          <div>
            <div className={styles.counter}>
              {remainingDays < 0 ? 0 : remainingDays}
            </div>
            <p>{remainingDays == 1 ? "Dia" : "Dias"}</p>
          </div>
          <div>
            <div className={styles.counter}>
              {remainingHours < 0 ? 0 : remainingHours}
            </div>
            <p>{remainingHours == 1 ? "Hora" : "Horas"}</p>
          </div>
          <div>
            <div className={styles.counter}>
              {remainingMinutes < 0 ? 0 : remainingMinutes}
            </div>
            <p>{remainingMinutes == 1 ? "Minuto" : "Minutos"}</p>
          </div>
        </section>
        {
          (remainingDays > 0 && remainingHours > 0 && remainingMinutes > 0) ?
          <h1>Para sexta feira 18:00!</h1>
          :
          ""
        }
      </section>
      {
        (remainingDays <= 0 && remainingHours <= 0 && remainingMinutes <= 0) ?  
        <Confetti
          width={width}
          height={height}
        />
        :
        ""
      }
    </div>
  );
}

export default App;
