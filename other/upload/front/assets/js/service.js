//
class Service {
   constructor() {
      this.service = axios.create({
         baseURL: 'http://46.101.24.61:3001',
         auth: {
            username: 'root',
            password: '123'
         }
      })
   }
   uploadFile(input) {
      var data = new FormData();
      data.append('sampleFile', input);

      this.service.post('/upload', data)
         .then(function (response) {
            console.log(response);
         })
         .catch(function (error) {
            console.log(error);
         });
   }

}