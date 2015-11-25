'use strict';

export default class extends think.service.base {
  /**
   * init
   * @return {}         []
   */
  init(...args){
    super.init(...args);
  }

  indexAction(){
    let GithubService = think.service("github");
    let instance = new GithubService();
  }
}
