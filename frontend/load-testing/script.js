import http from 'k6/http';
import { check } from 'k6';

export const options = {
  vus: 500,
  connections: 500,
  duration: '10s',
};

export default function () {
  const res = http.get('neigh');
  check(res, { 'status was 200': (r) => r.status == 200 });
}
