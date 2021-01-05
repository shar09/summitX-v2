function formatDate(date) {
    if(date === null) {
        return null;
    }
    return new Intl.DateTimeFormat().format(new Date(date));
}
  
export default formatDate;