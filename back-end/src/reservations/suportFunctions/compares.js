//compares two reservation_times
function compareRT(r1,r2){
    if(r1.reservation_time > r2.reservation_time){
      return true;
    }
    return false;
  }


module.exports = compareRT;