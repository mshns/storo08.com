import getPrize from './getPrize.js';

const renderData = (item) => {
  const tr = document.createElement('tr');

  const username = document.createElement('td');
  username.textContent = item.username;
  tr.append(username);

  const rake = document.createElement('td');
  rake.textContent = item.points.toFixed(2);
  tr.append(rake);

  const rakeBack = document.createElement('td');
  rakeBack.textContent = getPrize(item.points);
  tr.append(rakeBack);

  return tr;
};

export default renderData;
