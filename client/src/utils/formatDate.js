function formatDate(date) {
    if(date === null) {
        return null;
    }

    let months = [null, 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    let dateArray =  new Intl.DateTimeFormat().format(new Date(date)).split('/');

    return months[dateArray[0]] + "' " +dateArray[2];

}
  
export default formatDate;