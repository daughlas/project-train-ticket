import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

import './DepartDate.css';
import { h0 } from '../common/fp';

export default function DepartDate(props) {
  const { time, onClick } = props;

  // 性能优化， 为了 useMemo
  const h0OfDepart = h0(time);

  const departDateString = useMemo(() => {
    console.log(dayjs(time).format('YYYY-MM-DD'));
    return dayjs(time).format('YYYY-MM-DD');
  }, [h0OfDepart]);

  const departDate = new Date(h0OfDepart);
  const isTody = h0OfDepart === h0();

  const weekString =
    '周' +
    ['日', '一', '二', '三', '四', '五', '六'][departDate.getDay()] +
    (isTody ? '（今天）' : '');

  return (
    <div className="depart-date" onClick={onClick}>
      <input type="hidden" name="date" value={departDateString} />
      {departDateString}
      <span className="depart-week">{weekString}</span>
    </div>
  );
}

DepartDate.propTypes = {
  time: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};
