const calDateDifference = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const differenceInTime = endDate.getTime() - startDate.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);

    return differenceInDays;
};


const CalService = {
    calDateDifference
};
  
  export default CalService;        