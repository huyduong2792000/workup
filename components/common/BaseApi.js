import axios from 'axios';

const BaseApi = ({urlPrefix = '/api/v1/', collectionName = '', data}) => {
  // var baseURL = 'http://192.168.1.93:8678' + urlPrefix + collectionName;
  var baseURL = 'http://wiup.net/workup' + urlPrefix + collectionName;
  var method = {
    // baseURL : function(){
    //     return  'http://192.168.1.14:8678'+urlPrefix+collectionName
    // },
    get: async (props) => {
      var default_props = {
        id,
        page: 1,
        results_per_page: 50,
        order_by: [{field: 'created_at', direction: 'desc'}],
        filters: {},
        params:[]
      };
      var prop = {...default_props, ...props};
      let query = {filters: prop.filters, order_by: prop.order_by};
      var id = prop.id;
      if (!id) {
        id = '';
      } else {
        id = '/' + id;
      }
      var url =
        (await baseURL) +
        id +
        `?page=${prop.page}&results_per_page=${
          prop.results_per_page
        }&q=${JSON.stringify(query)}`;
      // console.log(Object.entries(prop.params));
      for (var param of prop.params) {
        for (var key in param){
          url += '&' + key + '=' + param[key]

        }
      }
      return await axios.get(url);
      // return response.data
    },
    post: async (data) => {      
      const response = await axios.post(baseURL, data);
      return response.data;
    },
    put: async (data) => {
      const response = await axios.put(baseURL + '/' + data.id, data);
      return response.data;
    },
    save: async function (data) {
      if (data.id == null) {
        const response = await this.post(data);
        return response;
      } else {
        const response = await this.put(data);
        return response;
      }
    },
    delete: function (data) {
      data.deleted = false;
      this.put(data);
    },
    deleteMultiple: async (data) => {
      const data_delete = {data_delete: data};
      const response = await axios.put(baseURL, data_delete).catch((error) => {
        console.log('error');
      });
      return response;
    },
  };
  return method;
};

export default BaseApi;
