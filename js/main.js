function renderOffices(rawData){
    const floors = rawData
    .filter(item => item.state == 0)
    .map(item => {
        return `<div class="floor" floorNo="${item.floorNo}">${item.floorNo}樓: 尚餘 ${item.count} 空位</div>`;
    });
    floors.forEach(floor => $('#overview').append(floor));
    $('#overview').on('click', '.floor', function(event) {
        var floorNo = $(this).attr('floorNo');
        getSeatsByFloor(currentOffice, floorNo);
    });
}
function renderSeats(rawData){
    const seats = rawData
    .map(item => {
        var occupiedSeat = `<div class="seat" seatNo="${item.seatNo}" state="${item.state}">座位：${item.seatNo} [員工：${item.empId} ${item.empName}(${item.deptName})]</div>`;
        var emptySeat = `<div class="seat" seatNo="${item.seatNo}" state="${item.state}">座位：${item.seatNo}</div>`;
        var seatHtml = item.state === 0 ? emptySeat : occupiedSeat;
        return seatHtml;
    })
    seats.forEach(seat => $('#seat-chart').append(seat));
}
function getSeatsByFloor(officeId, floorNo){
    const url = API_DOMAIN + "/office/" + officeId + "/floor/" + floorNo;
    axios.get(url,
    // {
    // headers: {
    //     'token': localStorage.getItem('token')}
    // }
).then(response => {
    const result = response.data.data;
    renderSeats(result);
})
  }