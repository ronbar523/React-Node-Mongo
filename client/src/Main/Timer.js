import React from "react";

const Timer = ({ timerDays, timerHours, timerMinutes, timerSeconds }) => {
  return (
    <section className="timer-container">
      {timerSeconds > 1 ? (

      
      <section className="timer">
        <div className="clock">
          <section>
            {timerDays >= 10 ? <p>{timerDays}</p> : <p>0{timerDays}</p>}
          </section>
          <span> : </span>
          <section>
            {timerHours >= 10 ? <p>{timerHours}</p> : <p>0{timerHours}</p>}
          </section>
          <span> : </span>
          <section>
            {timerMinutes >= 10 ? <p>{timerMinutes} </p> : <p>0{timerMinutes}</p>}        
          </section>
          <span> : </span>
          <section>
            {timerSeconds >= 10 ? <p>{timerSeconds} </p> : <p>0{timerSeconds}</p>}            
          </section>
          <section>
            { timerDays < 2 ? <p> Day </p> : <p>Days</p>}         
          </section>
        </div>
      </section> 
       ) : null } 
    </section>
  );
};



 
export default Timer;