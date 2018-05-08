import React, { Component } from 'react';

import Calendar from './calendar';
import ApiService from './apiService';


export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoadingData     : false,
      isCalendarVisible : false,
      calendarData      : []
    };
  }

  showCalendar = () => {
    let newState = {};

    if (!this.state.isCalendarVisible) {
      newState.isCalendarVisible = true;
    }
    
    newState.isLoadingData = true;
    this.setState(newState);

    ApiService.getRemoteData().then(response => {
      this.setState({
        calendarData  : response,
        isLoadingData : false,
      });
    });
  }

  render() {
    const { isCalendarVisible, isLoadingData, calendarData } = this.state;

    return (
      <div className="container">
        <hr />
        <div className="row">
            <div className="col-md-offset-2 col-md-8">
                <p>Add button on click of button call schedule.php and pass current date in YYYY-MM-DD format as GET paramter 'date'. </p>
                <p>Parse JSON response and create weekly calendar for each square showing date, different background color depneding on whether this day status is active, and description.
                If status is active description should be active link if not plain text</p>
                <p>Calendar should be shown as horizontal line of boxes which resize on different screen sizes and resolutions</p>
            </div>
        </div>
        <hr />

        <div>
            <button className="btn btn-primary" onClick={ this.showCalendar }>Calendar</button>
        </div>

        <hr />

        { isCalendarVisible &&
            <Calendar
              isLoading={ isLoadingData }
              data={ calendarData }
            />
        }
      </div>
    )
  }
}