import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);
const calculateDuration = (dateEntry, dateProcessed) => {
  const start = dayjs(dateEntry);
  const end = dayjs(dateProcessed);
  const duration = dayjs.duration(end.diff(start));
  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();
    
  return `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
};
export const waiterOrderContainer = () =>{
  return (<><p>hola</p>
  </>
  )
}