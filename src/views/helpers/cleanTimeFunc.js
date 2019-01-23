const cleanTimeFunc = timeArr => {
    const arr = [];
    timeArr.map(date => {
        const separateTime = date.split(' ');
        // console.log('this is separate time', separateTime);
        const cleantime = separateTime.slice(0, 4);
        // console.log('this is new clean time: ', cleantime);
        cleantime.splice(3, 0, 'at');

        const finalTime = cleantime.join(' '); //.insert(3, 'at');
        // console.log('this is final time: ', finalTime);
        // return 'this is final time: ', finalTime;
        arr.push(finalTime);
        return arr;
    });
    return arr;
};

module.exports = cleanTimeFunc;
