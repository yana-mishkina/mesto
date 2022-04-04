export default class UserInfo {
    constructor(profileTitleSelector, profileSubtitleSelector) {
        this._name = document.querySelector(profileTitleSelector);
        this._job = document.querySelector(profileSubtitleSelector);
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            job: this._job.textContent
          }
    }

    setUserInfo(name, job, avatar) {
        this._name.textContent = name;
        this._job.textContent = job;
    }
}