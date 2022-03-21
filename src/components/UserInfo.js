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

    setUserInfo(data) {
        this._name.textContent = data.name;
        this._job.textContent = data.job;
    }
}