class FetchService {
  urlApi = 'http://localhost:3000/';

  optionsPost(body) {
    return {
      method : 'POST',
      body   : JSON.stringify(body),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    };
  }

  async createUrlProfiles(urlsCandidates) {
    return fetch(
      this.urlApi+'/urlProfiles' ,
      this.optionsPost({ urlsCandidates })
    );
  }
  async creatProfile(profile) {
    return fetch(this.urlApi+'/profiles',this.optionsPost({ profile }));
  }
}

export default new FetchService();