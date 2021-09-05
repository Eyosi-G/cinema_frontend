// const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
// export const toMDYYYY = (date)=>{
//     return date.toLocaleDateString("en-us")
// }

export const convertToDateTime = (date) => {
  return date
    .toLocaleString("sv-SE", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
    .replace(" ", "T");
};


export const formatTime = (timer) =>{
  let minutes = Math.floor(timer % 60);
  let seconds = (timer - minutes).toFixed('2')
  return `${minutes} min: ${seconds}: sec`
}
