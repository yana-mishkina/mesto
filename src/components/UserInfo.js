export default class UserInfo {
    constructor(profileTitleSelector, profileSubtitleSelector, avatarSelector) {
        this._name = document.querySelector(profileTitleSelector);
        this._job = document.querySelector(profileSubtitleSelector);
        this._avatar = document.querySelector(avatarSelector)
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            job: this._job.textContent,
          }
    }

    setUserInfo(name, job) {
        this._name.textContent = name;
        this._job.textContent = job;
    }

    setUserAvatar(avatar) {
        this._avatar.src = avatar;
    }
}