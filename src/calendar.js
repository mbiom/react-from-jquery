import React from 'react';

function CalendarDay({ date, day, status }) {
  const colorClass = status.active ? 'panel-info' : 'panel-danger';

  return (
    <div className="col-xs-1">
      <div className={ "panel " + colorClass }>
        <div className="panel-heading">
          <div className='pnl-text'>
            <div>{ date }</div>
            <div>{ day }</div>
          </div>
        </div>
        <div className="panel-body">
          <div className="pnl-text">
            { status.active
                ? <a href="#">{ status.description }</a>
                : status.description
            }
          </div>
        </div>
      </div>
    </div>
  );
}

function Calendar(props) {
  if (props.isLoading) {
    return (
      <h3>Loading Data...</h3>
    );
  }

  return (
    <div className="row">
      { props.data &&
        props.data.map(dayData =>
          <CalendarDay { ...dayData } key={ dayData.id } />
        )
      }
    </div>
  );
};

export default Calendar;
