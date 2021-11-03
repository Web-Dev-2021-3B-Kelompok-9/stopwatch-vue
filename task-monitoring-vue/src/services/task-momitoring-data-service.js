/* eslint-disable class-methods-use-this */
import http from './http-common';

class TaskMonitoringDataService {
  staticgetAll() {
    return http.get('/read_task');
  }

  get(id) {
    return http.get(`/read_task/${id}`);
  }

  create(data) {
    return http.post('/create_task', data);
  }

  update(id, data) {
    return http.put(`/update_task/${id}`, data);
  }

  delete(id) {
    return http.delete(`/delete_task/${id}`);
  }
}

export default new TaskMonitoringDataService();
