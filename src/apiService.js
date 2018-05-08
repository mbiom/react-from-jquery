import moment from 'moment';
import axios from 'axios';

class ApiService {

  SERVER_URL = 'http://localhost:8888/schedule.php'
  
  statuses = [
    { 'active': true, 'description': 'Open' },
    { 'active': true, 'description': 'Almost Full' },
    { 'active': false, 'description': 'Full' },
    { 'active': false, 'description': 'Closed' },
  ]

  getCalendarData = () => {
    var weekData = [];

    var todayTS = new Date().valueOf();

    for (let i = 0; i < 7; i++) {
      var rand = Math.floor(Math.random() * 4);
      var margin = i * 24 * 60 * 60 * 1000

      weekData.push({
        'id'    : Math.floor(Math.random() * 1000),
        'date'  : moment(todayTS + margin).format('MMM D, YYYY'),
        'day'   : moment(todayTS + margin).format('dddd'),
        'status': this.statuses[rand]
      });
    }

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(weekData);
      }, 2000);
    })
  }

  getRemoteData = () => {
    const today = moment().format('YYYY-MM-DD')
    const URL = `${this.SERVER_URL}?date=${today}`;

    return new Promise((resolve, reject) => {
      axios.get(URL).then(response => {
        setTimeout(() => {
          resolve(this.deserialize(response.data));
        }, 1000);
      })
      .catch(err => {
        reject(err);
      });
    });
  }

  deserialize = weekData => {
    return weekData.map(entry => {
      return {
        ...entry,
        'id'    : Math.floor(Math.random() * 1000),
        'date'  : moment(entry.date).format('MMM D, YYYY'),
        'day'   : moment(entry.date).format('dddd'),
      }
    })
  }
}

export default new ApiService();
